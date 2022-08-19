var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  http = require("http"),
  methodOverride = require("method-override");
  server = http.createServer(app),
  mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());


mongoose.connect("mongodb+srv://Rebecca:mmxUBBb87qqcMOwn@cluster0.tzzwy.mongodb.net/login?retryWrites=true&w=majority", 
function (err, res) {
if (err) {
    console.log("ERROR: connecting to Database. " + err);
  }

});

var usuarioCtrl = require("./controllers/usuarios");

// API routes
var usuarios = express.Router();


usuarios.get('/usuarios', async (req, res) => {
    const usuario = await usuarioCtrl.findAllUsers();
    res.send(usuario);
  })

usuarios.post('/usuarios', async (req, res) => {
    const body = req.body;
  
    try {
      const newUsuario = await usuarioCtrl.createUser(body);
      res.status(201)
      res.send(newUsuario)
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(400)
        return res.send({
          message: "Error de validacion",
          reason: error.message
        })
      }
      res.status(500)
      return res.send({
        message: error.message
      })
    }
  }) 

app.use("/api", usuarios);
app.listen(4000, function () {
    console.log("Node server running on http://localhost:4000");
  });

