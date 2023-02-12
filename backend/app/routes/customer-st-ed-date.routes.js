module.exports = app => {
  const coustomer_st = require("../controllers/customer-st-ed-date.controller.js");
  var router = require("express").Router();

  // Create a new coustomer_st
  router.post("/", coustomer_st.create);

  // Retrieve all agencies
  router.get("/", coustomer_st.findAll);

  // Retrieve all published agencies
  router.get("/activated", coustomer_st.findAllPublished);

  // Retrieve a single coustomer_st with id
  router.get("/:id", coustomer_st.findOne);

  // Update a coustomer_st with id
  router.put("/:id", coustomer_st.update);

  // Delete a coustomer_st with id
  router.delete("/:id", coustomer_st.delete);

  // Delete all agencies
  //router.delete("/", coustomer_st.deleteAll);

  app.use('/api/v1/coustomer_st', router);
};
