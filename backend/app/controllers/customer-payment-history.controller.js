const { newsAgencyDB } = require("../models");
const Customer_pay = newsAgencyDB.coustomer_pay;
const Customer = newsAgencyDB.customer;
const Op = newsAgencyDB.Sequelize.Op;
const Sequelize = require("sequelize");


// Create and Save a new customer_pay
exports.create = (req, res) => {
  // Validate request
  console.log(req.body);


  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a customer_pay
  const customer_pay = {
    customer_id: req.body.customer_id,
    payment_date: req.body.payment_date,
    receipt_no: req.body.receipt_no,
    payment_amount: req.body.payment_amount,
    is_active: req.body.is_active ? req.body.is_active : 0,

  };

  // Save customer_pay in the database
  Customer_pay.create(customer_pay)
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

    Customer_pay.findAll()
      .then((customer_pay) => {
        return res.status(200).json(customer_pay)

      });


  } catch (err) {
    console.log(err);
    return res.status(500).json({ 'error': 'internal server error' })

  }
};

// Find a single customer_pay with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log('paan' + id);
  Customer_pay.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find customer_pay with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving customer_pay with id=" + id
      });
    });
};

// Update a customer_pay by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Customer_pay.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "customer_pay was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update customer_pay with id=${id}. Maybe customer_pay was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating customer_pay with id=" + id
      });
    });
};

// Delete a customer_pay with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Customer_pay.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "customer_pay was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete customer_pay with id=${id}. Maybe customer_pay was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete customer_pay with id=" + id
      });
    });
};

// Delete all customer_pay from the database.
exports.deleteAll = (req, res) => {
  Customer_pay.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} customer_pay were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all customer_pay."
      });
    });
};

// find all published customer_pay

exports.findAllPublished = (req, res) => {
  Customer_pay.findAll({ where: { is_active: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customer_pay."
      });
    });
};
