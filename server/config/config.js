//=====================
//puerto
//=====================

process.env.PORT = process.env.PORT || 3000;
//=====================
//entorno
//=====================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//=====================
//base de datos
//=====================
let urlDB;
//if (process.env.NODE_ENV === "dev") {
//  urlDB = "mongodb://localhost:27017/impresora";
//} else {
urlDB =
    "mongodb+srv://wen_22:1234@dbimpresora.7q8pe.mongodb.net/Impresora?retryWrites=true&w=majority";
//}

process.env.URLDB = urlDB;