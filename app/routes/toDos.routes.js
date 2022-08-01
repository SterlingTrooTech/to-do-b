module.exports = app => {
  const toDos = require("../controllers/toDos.controller");
  var router = require("express").Router();

  router.post("/", toDos.create);
  router.get("/", toDos.findAll);
  router.put("/:id", toDos.update);
  router.delete("/:id", toDos.delete);
  router.delete("/", toDos.deleteAll);
  app.use("/todo/toDos", router);
};