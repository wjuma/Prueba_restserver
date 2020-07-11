const express = require("express");
const app = express();
const _ = require("underscore");
const Impresora = require("../models/impresora");
//Indicar todos mis campos menos contador y con un limite
app.get("/", (req, res) => {
    res.json({ nombre: "Wendy Juma" });
});
app.get("/impresora", (req, res) => {
    let id = req.params.id;
    Impresora.find({}, ["marca", "modelo", "serie", "color", "ip", "precio"])
        // .skip(1)
        // .limit(3)
        .exec((err, impresoras) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err,
                });
            }
            //Impresora.count({}, (err, conteo) => {
            res.json({
                ok: true,
                impresoras,
                //cuantos: conteo,
            });
            //});
        });
});
// Impresora.findById(id, body, (err, usuarioDB) {
//     if (err) {
//         return res.status(400).json({
//             ok: false,
//             err,
//         });
//     }
//     res.json({
//         ok: true,
//         usuario: usuarioDB,
//     });
// });
app.get("/impresora/:id", (req, res) => {
    let id = req.params.id;
    Impresora.findById(
        id, ["marca", "modelo", "serie", "color", "ip", "precio"],
        (err, usuarioDB) => {
            if (!usuarioDB) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        message: `No existe el id = ${id} buscado`,
                    },
                });
            }

            res.json({
                ok: true,
                usuario: usuarioDB,
            });
        }
    );
});

//peticiones post
app.post("/impresora", (req, res) => {
    let body = req.body;
    let impresora = new Impresora({
        marca: body.marca,
        modelo: body.modelo,
        serie: body.serie,
        color: body.color,
        contador: body.contador,
        ip: body.ip,
        precio: body.precio,
    });

    //grabar en la base de datos
    impresora.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB,
        });
    });
});
//No actualizar serie, contador y marca/Completado
app.put("/impresora/:id", (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ["modelo", "color", "ip", "precio"]);

    Impresora.findByIdAndUpdate(id, body, { new: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB,
        });
    });
});

app.delete("/impresora/:id", (req, res) => {
    let id = req.params.id;
    Impresora.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err,
            });
        }
        //eliminar id
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: { message: "Usuario no encontrado" },
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado,
        });
    });
});

module.exports = app;