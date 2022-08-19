var mongoose = require("mongoose");
const userModel = require('../models/usuarios')
//GET - Regresa todos los usuarios en DB

const findAllUsers = async () => {
    const usuarios = await userModel.find({});
    return usuarios;
  }


//POST - Agrega un nuevo registro de usuario
exports.addUsuario = function (req, res) {
    console.log("POST");
    console.log(req.body);
  
    var usuarioNuevo = new userModel({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      edad: req.body.edad,
      pais: req.body.pais,
      contraseña: req.body.contraseña

    });
  
    usuarioNuevo.save(function (err, respuestaUsuarioNuevo) {
      if (err) return res.status(500).send(err.message);
      res.status(200).jsonp(respuestaUsuarioNuevo);
    });
  };

  const createUser = async (product) => {
    const newUsuario = new userModel(product);
    return newUsuario.save();
  }


  module.exports ={
    findAllUsers,
    createUser
  }