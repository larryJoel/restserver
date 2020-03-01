//libreria config. 
// solo el puerto
require('./config/config');
//librerias necesarias para que funcione el server
const express = require('express');
//libreria de la base de datos mongodb
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');
// configuración del bodyParser para trabajar 
// con las peticiones post
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use( require('./routes/index'));
 
mongoose.connect( process.env.URLDB, {
  useNewUrlParser: true,
  useCreateIndex:true,
  useUnifiedTopology: true
},(err,res)=>{

  if(err)throw err;
  console.log('base de datos ONLINE');
})
// await mongoose.connect('mongodb://localhost:27017/cafe', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });



 //función que muestra en consola
 // el mensaje de conexion
app.listen(process.env.PORT,()=>{
  console.log('Escuchando puerto ',process.env.PORT)
})