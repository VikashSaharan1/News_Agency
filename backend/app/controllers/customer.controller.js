const { newsAgencyDB } = require("../models");
const Customer = newsAgencyDB.customer;
const Op = newsAgencyDB.Sequelize.Op;
const Sequelize = require("sequelize");


// Create and Save a new customer
exports.create = (req, res) => {
  // Validate request
  console.log(req.body);


  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a customer
  const customer = {
    name: req.body.name,
    mobileno: req.body.mobileno,
    address: req.body.address,
    whatsappno: req.body.whatsappno,
    is_active: req.body.is_active ? req.body.is_active : 0,

  };

  // Save customer in the database
  Customer.create(customer)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the customer."
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
    Customer.findAll({
      where: where
  })
    .then((customer) => {
      return res.status(200).json(customer)

    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ 'error': 'internal server error' })

  }
};

// Find a single customer with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log('paan' + id);
  Customer.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find customer with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving customer with id=" + id
      });
    });
};

// Update a customer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Customer.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "customer was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update customer with id=${id}. Maybe customer was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating customer with id=" + id
      });
    });
};

// Delete a customer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Customer.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "customer was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete customer with id=${id}. Maybe customer was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete customer with id=" + id
      });
    });
};

// Delete all customers from the database.
exports.deleteAll = (req, res) => {
  Customer.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} customer were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customers."
      });
    });
};

// find all published customer

exports.findAllPublished = (req, res) => {
  Customer.findAll({ where: { is_active: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customer."
      });
    });
};
