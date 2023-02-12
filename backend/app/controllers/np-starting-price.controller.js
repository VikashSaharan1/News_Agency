const { newsAgencyDB } = require("../models");
const NP_start_price = newsAgencyDB.np_start_price;
const Op = newsAgencyDB.Sequelize.Op;
const Sequelize = require("sequelize");


// Create and Save a new np_start_price
exports.create = (req, res) => {
  // Validate request
  console.log(req.body);


  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a np_start_price
  const np_start_price = {
    name: req.body.name,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    per_copy_price: req.body.per_copy_price,
    is_active: req.body.is_active ? req.body.is_active : 0,
  };

  // Save np_start_price in the database
  NP_start_price.create(np_start_price)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the np_start_price."
      });
    });
};

// Retrieve all agencies from the database.
exports.findAll = async (req, res) => {

  try {
    let where = {};
    if (req.body.is_active != null) {
      where.is_active = req.body.is_active
    }
    NP_start_price.findAll()
    .then((np_start_price) => {
      return res.status(200).json(np_start_price)
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ 'error': 'internal server error' })
  }
};

// Find a single np_start_price with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log('paan' + id);
  NP_start_price.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find np_start_price with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving np_start_price with id=" + id
      });
    });
};

// Update a np_start_price by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  NP_start_price.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "np_start_price was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update np_start_price with id=${id}. Maybe np_start_price was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating np_start_price with id=" + id
      });
    });
};

// Delete a np_start_price with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  NP_start_price.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "np_start_price was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete np_start_price with id=${id}. Maybe np_start_price was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete np_start_price with id=" + id
      });
    });
};

// Delete all np_start_prices from the database.
exports.deleteAll = (req, res) => {
  NP_start_price.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} np_start_price were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all np_start_prices."
      });
    });
};

// find all published np_start_price

exports.findAllPublished = (req, res) => {
  NP_start_price.findAll({ where: { is_active: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving np_start_price."
      });
    });
};
