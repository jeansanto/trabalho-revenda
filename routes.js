const express = require("express");
const routes = express.Router();

const UsuarioController = require("./controllers/UsuarioController");
const MarcaController = require("./controllers/MarcaController");
const CarroController = require("./controllers/CarroController");
const ManutencaoController = require("./controllers/ManutencaoController");

const login = require("./middlewares/login");

routes.get("/usuarios", UsuarioController.index)
      .post("/usuarios", UsuarioController.store)
      .post("/login", UsuarioController.login)
      .get("/senhas", login, UsuarioController.senhas);

routes.get("/marcas", MarcaController.index)
      .post("/marcas", MarcaController.store);

routes.get("/carros", CarroController.index)
      .post("/carros", CarroController.store)
      .put("/carros/:id", CarroController.update)
      .delete("/carros/:id", CarroController.destroy)

      .put("/carros/destaque/:id", CarroController.destaque)
      .get("/carros/destaques", CarroController.destaques)

      .put("/carros/reajuste/:taxa/:marca_id?", CarroController.updateValue)

      .get("/carros/filtro/:palavra", CarroController.search)
      .get("/carros/filtro-preco", CarroController.filter)

      .get("/carros/marcas-num", CarroController.groupMarcas)
      .get("/carros/anos-cad", CarroController.groupDataCad)

      .get("/carros/:id", CarroController.show);

routes.get("/manutencao", ManutencaoController.index)
      .post("/manutencao", ManutencaoController.store)
      .get("/estatisticas", ManutencaoController.dados)
      .put("/manutencao/:id", ManutencaoController.update)
      .delete("/manutencao/:id", ManutencaoController.destroy)

module.exports = routes;