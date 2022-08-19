var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

  var usuariosSchema = new Schema({
    nombre: { type: String },
    apellido: { type: String },
    email: { type: String },
    edad: { type: Number },
    pais: { type: String },
    contraseña: { type: String}
  });
  
  module.exports = mongoose.model("users", usuariosSchema);