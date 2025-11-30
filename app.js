const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Carpeta para subir archivos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas
const excelRoutes = require("./routes/excelRoutes");
app.use("/api", excelRoutes);

// Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
