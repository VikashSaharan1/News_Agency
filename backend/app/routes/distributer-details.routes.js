module.exports = app => {
  const distributer_detail = require("../controllers/distributer-details.controller.js");
  var router = require("express").Router();

  // Create a new distributer_detail
  router.post("/", distributer_detail.create);

  // Retrieve all distributer_details
  router.get("/", distributer_detail.findAll);

  // Retrieve all published distributer_details
  router.get("/activated", distributer_detail.findAllPublished);

  // Retrieve a single distributer_detail with id
  router.get("/:id", distributer_detail.findOne);

  // Update a distributer_detail with id
  router.put("/:id", distributer_detail.update);

  // Delete a distributer_detail with id
  router.delete("/:id", distributer_detail.delete);

  // Delete all distributer_details
  //router.delete("/", distributer_detail.deleteAll);

  app.use('/api/v1/distributer_detail', router);
};
