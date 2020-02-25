//libreria config. 
// solo el puerto
require('./config/config');
//librerias necesarias para que funcione el server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// configuración del bodyParser para trabajar 
// con las peticiones post
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

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

app.get('/usuario', function (req, res) {
  res.json('get usuario')
})
//petición post (crear)
app.post('/usuario', function (req, res) {
  let body = req.body;
  if (body.nombre === undefined) {
    res.status(400).json({
      ok: false,
      mensaje:'El nombre es necesario'
    });
  }else{
    res.json({
    persona:body});
  }
});
//petición Put (actualizar)
app.put('/usuario/:id', function (req, res) {
  let id = req.params.id;
  res.json({
      id
    });
})
//petición pash (actualizar)
app.patch('/usuario', function (req, res) {
  res.json('patch usuario')
})
//petición delete (borrar)
app.delete('/usuario', function (req, res) {
  res.json('delete usuario')
})
 //función que muestra en consola
 // el mensaje de conexion
app.listen(process.env.PORT,()=>{
  console.log('Escuchando puerto ',process.env.PORT)
})