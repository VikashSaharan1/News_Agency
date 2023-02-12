module.exports = app => {
  const news_paper = require("../controllers/news-paper.controller.js");
  var router = require("express").Router();

  // Create a new news_paper
  router.post("/", news_paper.create);

  // Retrieve all news_papers
  router.get("/", news_paper.findAll);

  // Retrieve all published news_papers
  router.get("/activated", news_paper.findAllPublished);

  // Retrieve a single news_paper with id
  router.get("/:id", news_paper.findOne);

  // Update a news_paper with id
  router.put("/:id", news_paper.update);

  // Delete a news_paper with id
  router.delete("/:id", news_paper.delete);

  // Delete all news_papers
  //router.delete("/", news_paper.deleteAll);

  app.use('/api/v1/news_paper', router);
};
