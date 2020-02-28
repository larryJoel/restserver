// ===============================
// PUERTO
// ===============================

process.env.PORT = process.env.PORT || 3000;


// ===============================
// ENTORNO
// ===============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===============================
// BASES DE DATOS   
// ===============================

let urlDB;
 if (process.env.NODE_ENV === 'dev') {
     urlDB = 'mongodb://localhost:27017/cafe';
   
  } else {
     urlDB = 'mongodb+srv://supervisor:BLWngdr3FWQtQD56@cluster0-uftg6.mongodb.net/test';
  }

process.env.URLDB = urlDB;
