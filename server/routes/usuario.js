//librerias necesarias para que funcione el server
const express = require('express');
// libreria para encriptar la contraseña con un HASH de una via
const bcrypt = require('bcrypt');
// libreria usada en este caso para validar los campos que no queremos cambiar
const _=require('underscore');
// conexion con el archivo donde estan los modelos de usuarios
const Usuario = require('../models/usuario');
//libreria de la base de datos mongodb
const mongoose = require('mongoose');
const app = express();
//verificar token
const { verificarToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
// función que envia el mensaje de respuesta
 // a la petición GET
 // usando get en el .app
 ////---------------OJO-------------
// app.get('/usuario', function (req, res) {
//   res.send('get usuario')
// })
//--------------------------------------
 // función que envia el mensaje de respuesta
 // a la petición GET (consultar)
 // usando json en el .app

 app.get('/usuario', verificarToken,(req, res) => {

  // return res.json({
  //   usuario:req.usuario,
  //   nombre: req.usuario.nombre,
  //   email: req.usuario.email
  // });
   
  let desde = req.query.desde || 0;
  let limite = req.query.limite || 5;

  desde = Number(desde);
  limite = Number(limite);

  Usuario.find({estado:true}, 'nombre estado email rol img')
          .skip(desde)
          .limit(limite)
          .exec((err,usuarios)=>{
            if ( err){
              return res.status(400).json({
                ok: false,
                err
              });
            }

            Usuario.count({estado:true},(err, conteo)=>{
              res.json({
              ok: true,
              usuarios,
              cuantos: conteo
            });

            });
          });
  })


  //petición post (crear)
  app.post('/usuario',[verificarToken,verificaAdmin_Role] , (req, res) => {
    
    
    let body = req.body;

    let usuario = new Usuario({
      nombre: body.nombre,
      email: body.email,
      password: bcrypt.hashSync(body.password,10),
      role: body.role
    });

    usuario.save((err,usuarioDb)=>{
      if ( err){
        return res.status(400).json({
          ok: false,
          err
        });
      }
      res.json({
        ok: true,
        usuario: usuarioDb
      });

    })



  });
  //petición Put (actualizar)
  app.put('/usuario/:id', [verificarToken,verificaAdmin_Role],function (req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'role','estado']);

    Usuario.findOneAndUpdate(id, body,{ new:true, runValidators: true },(err, usuarioDb)=>{
      if (err){
        return res.status(400).json({ 
        ok:false,
        err
      });
    }
    res.json({
        ok: true,
        usuario: usuarioDb
      });
  })


});



  //petición pash (actualizar)
  app.patch('/usuario', [verificarToken,verificaAdmin_Role], function (req, res) {
    res.json('patch usuario')
  });


  //petición delete (borrar fisicamente de la BD)
  app.delete('/usuario/:id',[verificarToken,verificaAdmin_Role], function (req, res) {
    
    let id= req.params.id;
    // Usuario.findByIdAndDelete(id, (err,usuarioBorrado)=>{
      let cambiaEstado = {
        estado: false
      };

      Usuario.findOneAndUpdate(id, cambiaEstado, { new:true },(err, usuarioBorrado)=>{
      if (err){
        return res.status(400).json({ 
        ok:false,
        err
      });
    };

    if (!usuarioBorrado){
      return res.status(400).json({
        ok:false,
        err:{
          message:'usuario no encontrado, verifique si no está borrado'
        }
      });
    }

    res.json({
      ok:true,
      usuario: usuarioBorrado
    });

    });




  })
  
  module.exports = app;