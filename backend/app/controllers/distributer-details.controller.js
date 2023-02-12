const { newsAgencyDB } = require("../models");
const Distributer_detail = newsAgencyDB.distributer_detail;
const Op = newsAgencyDB.Sequelize.Op;
const Sequelize = require("sequelize");


// Create and Save a new distributer_detail
exports.create = (req, res) => {
  // Validate request
  console.log(req.body);


  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a distributer_detail
  const distributer_detail = {
    name: req.body.name,
    mobileno: req.body.mobileno,
    address: req.body.address,
    whatsappno: req.body.whatsappno,
    is_active: req.body.is_active ? req.body.is_active : 0,

  };

  // Save distributer_detail in the database
  Distributer_detail.create(distributer_detail)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the distributer_detail."
      });
    });
};

// Retrieve all distributer_details from the database.
exports.findAll = async (req, res) => {

  try {
    let where = {};
    if (req.body.is_active != null) {
      where.is_active = req.body.is_active
    }

    Distributer_detail.findAll()
    .then((distributer_detail) => {
      return res.status(200).json(distributer_detail)

    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ 'error': 'internal server error' })

  }
};

// Find a single distributer_detail with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log('paan' + id);
  Distributer_detail.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find distributer_detail with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving distributer_detail with id=" + id
      });
    });
};

// Update a distributer_detail by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Distributer_detail.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "distributer_detail was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update distributer_detail with id=${id}. Maybe distributer_detail was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating distributer_detail with id=" + id
      });
    });
};

// Delete a distributer_detail with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Distributer_detail.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "distributer_detail was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete distributer_detail with id=${id}. Maybe distributer_detail was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete distributer_detail with id=" + id
      });
    });
};

// Delete all distributer_details from the database.
exports.deleteAll = (req, res) => {
  Distributer_detail.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} distributer_detail were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all distributer_details."
      });
    });
};

// find all published distributer_detail

exports.findAllPublished = (req, res) => {
  Distributer_detail.findAll({ where: { is_active: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving distributer_detail."
      });
    });
};
