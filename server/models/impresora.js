const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
let Schema = mongoose.Schema;

let impresoraSchema = new Schema({
    marca: { type: String, required: [true, "La marca es requerida"] },
    modelo: { type: String, required: [true, "El modelo es necesario"] },
    serie: {
        type: Number,
        required: [true, "El # de serie es necesario"],
        unique: true,
    },
    color: { type: Boolean, default: false },
    ip: { type: String, required: [true, "El ip es necesario"] },
    contadort: { type: Number, required: false, default: 0 },
    precio: { type: Number, required: [true, "El precio es necesario"] },
});
impresoraSchema.plugin(uniqueValidator, {
    message: "{PATH} debe de ser unico",
});
module.exports = mongoose.model("impresora", impresoraSchema);