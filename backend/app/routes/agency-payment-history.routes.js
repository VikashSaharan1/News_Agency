module.exports = app => {
  const agency_pay = require("../controllers/agency-payment-history.controller.js");
  var router = require("express").Router();

  // Create a new agency_pay
  router.post("/", agency_pay.create);

  // Retrieve all agency_pays
  router.get("/", agency_pay.findAll);

  // Retrieve all published agency_pays
  router.get("/activated", agency_pay.findAllPublished);

  // Retrieve a single agency_pay with id
  router.get("/:id", agency_pay.findOne);

  // Update a agency_pay with id
  router.put("/:id", agency_pay.update);

  // Delete a agency_pay with id
  router.delete("/:id", agency_pay.delete);

  // Delete all agency_pays
  //router.delete("/", agency_pay.deleteAll);

  app.use('/api/v1/agency_pay', router);
};
