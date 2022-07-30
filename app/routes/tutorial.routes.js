module.exports =app =>{
    const tutorials =  require("../controllers/tutorial.controller.js");

    var router = require("express").Router();
    router.post("/",tutorials.create);
    router.get("/",tutorials.findAll);
    router.get("/published", tutorials.findAllpublished);
    router.get("/:id",tutorials.findone);
    router.put("/:id", tutorials.update);
    router.delete("/:id", tutorials.delete);
    router.delete("/", tutorials.deleteAll);
    app.use('/api/tutorials', router);
}