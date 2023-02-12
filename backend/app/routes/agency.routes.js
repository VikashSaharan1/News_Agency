module.exports = app => {
  const agency = require("../controllers/agency.controller.js");
  var router = require("express").Router();

  // Create a new agency
  router.post("/", agency.create);

  // Retrieve all agencies
  router.get("/", agency.findAll);

  // Retrieve all published agencies
  router.get("/activated", agency.findAllPublished);

  // Retrieve a single agency with id
  router.get("/:id", agency.findOne);

  // Update a agency with id
  router.put("/:id", agency.update);

  // Delete a agency with id
  router.delete("/:id", agency.delete);

  // Delete all agencies
  //router.delete("/", agency.deleteAll);

  app.use('/api/v1/agency', router);
};
