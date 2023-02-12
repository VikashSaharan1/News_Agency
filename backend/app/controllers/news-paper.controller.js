const { newsAgencyDB } = require("../models");
const News_paper = newsAgencyDB.news_paper;
const Op = newsAgencyDB.Sequelize.Op;
const Sequelize = require("sequelize");


// Create and Save a new news_paper
exports.create = (req, res) => {
  // Validate request
  console.log(req.body);


  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a news_paper
  const news_paper = {
    name: req.body.name,
    is_active: req.body.is_active ? req.body.is_active : 0,

  };

  // Save news_paper in the database
  News_paper.create(news_paper)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the news_paper."
      });
    });
};

// Retrieve all news_papers from the database.
exports.findAll = async (req, res) => {

  try {
    let where = {};
    if (req.body.is_active != null) {
      where.is_active = req.body.is_active
    }

    News_paper.findAll()
      .then((news_papers) => {
        return res.status(200).json(news_papers)
      });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ 'error': 'internal server error' })

  }
};

// Find a single news_paper with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log('paan' + id);
  News_paper.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find news_paper with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving news_paper with id=" + id
      });
    });
};

// Update a news_paper by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  News_paper.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "news_paper was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update news_paper with id=${id}. Maybe news_paper was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating news_paper with id=" + id
      });
    });
};

// Delete a news_paper with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  News_paper.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "news_paper was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete news_paper with id=${id}. Maybe news_paper was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete news_paper with id=" + id
      });
    });
};

// Delete all news_papers from the database.
exports.deleteAll = (req, res) => {
  news_paper.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} news_papers were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all citirs."
      });
    });
};

// find all published news_paper
exports.findAllPublished = (req, res) => {
  News_paper.findAll({ where: { is_active: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving news_papers."
      });
    });
};
