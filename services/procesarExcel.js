const readExcelFile = require('read-excel-file/node');

module.exports = async function procesarExcel(rutaExcel) {
    const rows = await readExcelFile(rutaExcel);

    const ficha = rows[2][2];

    const normalizarNombre = (texto) => {
        if (typeof texto !== 'string') return '';
        return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    };

    const NOMBRE_COLUMNAS = {
        'numero de documento': 'documento',
        'nombre': 'nombre',
        'apellidos': 'apellido',
        'tipo de documento': 'tipo_documento',
        'estado': 'estado',
        'competencia': 'competencia',
        'resultado de aprendizaje': 'resultado',
        'juicio de evaluacion': 'juicio',
        'fecha y hora del juicio evaluativo': 'fecha_juicio',
        'funcionario que registro el juicio evaluativo': 'funcionario'
    };

    const encabezadosExcel = rows[12];
    const mapaIndices = {};

    for (let i = 0; i < encabezadosExcel.length; i++) {
        const normalizado = normalizarNombre(encabezadosExcel[i]);
        if (NOMBRE_COLUMNAS[normalizado]) {
            mapaIndices[NOMBRE_COLUMNAS[normalizado]] = i;
        }
    }

    const datosAprendices = rows.slice(12);
    const aprendicesAgrupados = {};

    datosAprendices.forEach(fila => {
        const doc = fila[mapaIndices.documento];
        if (!doc) return;

        const nombre = fila[mapaIndices.nombre];
        const apellido = fila[mapaIndices.apellido];

        if (!aprendicesAgrupados[doc]) {
            aprendicesAgrupados[doc] = {
                documento: doc,
                nombre,
                apellido,
                juicios: []
            };
        }

        const juicio = {};
        for (const [prop, idx] of Object.entries(mapaIndices)) {
            juicio[prop] = fila[idx];
        }

        aprendicesAgrupados[doc].juicios.push(juicio);
    });

    const lista = Object.values(aprendicesAgrupados);
    const resumen = [];

    lista.forEach(aprendiz => {
        const item = {};

        item.documento = aprendiz.documento;
        item.nombre = `${aprendiz.nombre} ${aprendiz.apellido}`;
        item.ficha = ficha;
        item.juicios = aprendiz.juicios.length;

        let aprobados = 0;
        let porEvaluar = 0;

        aprendiz.juicios.forEach(j => {
            const eval = (j.juicio || "").toString().trim().toUpperCase();
            if (eval === "APROBADO") aprobados++;
            if (eval === "POR EVALUAR") porEvaluar++;
        });

        item.juiciosAprobados = aprobados;
        item.juiciosPorEvaluar = porEvaluar;
        item.porcentajeJuiciosEvaluados = ((aprobados / item.juicios) * 100).toFixed(2) + "%";
        item.porcentajeJuiciosPorEvaluar = ((porEvaluar / item.juicios) * 100).toFixed(2) + "%";

        resumen.push(item);
    });

    return resumen;
};
