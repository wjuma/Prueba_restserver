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
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 3;
    limite = Number(limite);

    Impresora.find({}, ["marca", "modelo", "numserie", "b_n", "ip", "precio"])
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
// Impresora.findById(id, body, (err, usuarioDBr) {
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

//peticiones post
app.post("/impresora", (req, res) => {
    let body = req.body;
    let impresora = new Impresora({
        marca: body.marca,
        modelo: body.modelo,
        numserie: body.numserie,
        b_n: body.b_n,
        numcont: body.numcont,
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
    let body = _.pick(req.body, ["modelo", "b_n", "ip", "precio"]);

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