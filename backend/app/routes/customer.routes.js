module.exports = app => {
  const customer = require("../controllers/customer.controller.js");
  var router = require("express").Router();

  // Create a new customer
  router.post("/", customer.create);

  // Retrieve all customers
  router.get("/", customer.findAll);

  // Retrieve all published customers
  router.get("/activated", customer.findAllPublished);

  // Retrieve a single customer with id
  router.get("/:id", customer.findOne);

  // Update a customer with id
  router.put("/:id", customer.update);

  // Delete a customer with id
  router.delete("/:id", customer.delete);

  // Delete all customers
  //router.delete("/", customer.deleteAll);

  app.use('/api/v1/customer', router);
};
