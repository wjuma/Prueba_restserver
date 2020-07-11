require("./config/config"); // voy a requerir lo que este en mi carpeta
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/jsonapp.use(bodyParser.json());

//Conexion base de datos
app.use(require("./routes/impresora"));
mongoose.connect("mongodb://localhost:27017/impresora", (err, res) => {
    if (err) throw err;
    console.log("base");
});

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`);
});