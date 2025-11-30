const express = require("express");
const multer = require("multer");
const path = require("path");
const procesarExcel = require("../services/procesarExcel");

const router = express.Router();

// Configuración de multer (archivo temporal)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post("/upload-juicios", upload.single("archivo"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: "No se recibió ningún archivo" });
        }

        const rutaArchivo = req.file.path;

        const resumen = await procesarExcel(rutaArchivo);

        res.json({
            msg: "Archivo procesado correctamente",
            resumen
        });
    } catch (error) {
        console.error("Error procesando Excel:", error);
        res.status(500).json({ msg: "Error interno al procesar el archivo" });
    }
});

module.exports = router;
