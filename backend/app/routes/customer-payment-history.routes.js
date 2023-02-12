module.exports = app => {
  const customer_pay = require("../controllers/customer-payment-history.controller.js");
  var router = require("express").Router();

  // Create a new customer_pay
  router.post("/", customer_pay.create);

  // Retrieve all customers
  router.get("/", customer_pay.findAll);

  // Retrieve all published customers
  router.get("/activated", customer_pay.findAllPublished);

  // Retrieve a single customer_pay with id
  router.get("/:id", customer_pay.findOne);

  // Update a customer_pay with id
  router.put("/:id", customer_pay.update);

  // Delete a customer_pay with id
  router.delete("/:id", customer_pay.delete);

  // Delete all customer_pay
  //router.delete("/", customer_pay.deleteAll);

  app.use('/api/v1/customer_pay', router);
};
