module.exports = app => {
  const np_start_price = require("../controllers/np-starting-price.controller.js");
  var router = require("express").Router();

  // Create a new np_start_price
  router.post("/", np_start_price.create);

  // Retrieve all np_start_prices
  router.get("/", np_start_price.findAll);

  // Retrieve all published np_start_prices
  router.get("/activated", np_start_price.findAllPublished);

  // Retrieve a single np_start_price with id
  router.get("/:id", np_start_price.findOne);

  // Update a np_start_price with id
  router.put("/:id", np_start_price.update);

  // Delete a np_start_price with id
  router.delete("/:id", np_start_price.delete);

  // Delete all np_start_prices
  //router.delete("/", np_start_price.deleteAll);

  app.use('/api/v1/np_start_price', router);
};
