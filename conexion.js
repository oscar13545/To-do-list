const mongoose = require('mongoose');

mongoose.connect('mongodb://54.243.22.25:27017/DbTest')  
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));

const db = mongoose.connection

db.on('connected', ()=>{console.log('Se conectó correctamente a mongo')})
db.on('error', ()=>{console.log('No se pudo conectar correctamente a mongo')})

module.exports = mongoose