# 📊 Procesador de Excel para Avance de Aprendices (Node.js)

Este proyecto permite **cargar un archivo Excel desde una API**, procesarlo y generar un resumen del **avance de cada aprendiz**, incluyendo:

- Número total de juicios registrados
- Juicios aprobados y juicios por evaluar
- Porcentajes de avance
- Datos del aprendiz y ficha
- Normalización automática de los nombres de las columnas del Excel

Ideal para reportes académicos y procesos internos en ambientes como el SENA.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express
- Multer (para carga de archivos)
- read-excel-file
- JavaScript

---

## 📂 Estructura del proyecto

/project
│── app.js
│── readExcel.js
│── avanceAprendizDto.js
│── package.json
│── /uploads # Archivos temporales subidos (ignorado en git)
│── /node_modules # Dependencias (ignorado en git)
└── .gitignore


---

## ⚙️ Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/usuario/repositorio.git

2. Instalar dependencias

npm install

3. Ejecutar el servidor

npm start

```

📥 Endpoint para cargar archivo
POST /api/excel/upload

Recibe un archivo Excel y devuelve un JSON con el avance de los aprendices.

Headers

Content-Type: multipart/form-data

| Campo     | Tipo | Descripción           |
| --------- | ---- | --------------------- |
| `archivo` | File | Archivo Excel (.xlsx) |

📌 Ejemplo en Postman

Selecciona POST

URL: http://localhost:3000/api/excel/upload

En Body → form-data añade:

Key: archivo

Type: File

Selecciona el archivo Excel

Envía la petición.

📊 Ejemplo de respuesta JSON
[
{
"documento": "10203040",
"nombre": "Juan Pérez",
"ficha": "2552665",
"juicios": 8,
"juiciosAprobados": 6,
"juiciosPorEvaluar": 2,
"porcentajeJuiciosPorEvaluar": "25.00%",
"porcentajeJuiciosEvaluados": "75.00%"
}
]

🧠 Resumen de la lógica de procesamiento

Normaliza nombres de columnas (elimina tildes, mayúsculas y espacios innecesarios).

Agrupa registros por documento del aprendiz.

Cuenta y clasifica los juicios:

Aprobado

Por Evaluar

Calcula porcentajes de avance.

Genera un DTO limpio y ordenado por aprendiz.

El archivo principal del procesamiento es:

readExcel.js

🤝 Contribuciones

Las contribuciones son bienvenidas.
Puedes abrir issues, enviar PRs o sugerir mejoras.

