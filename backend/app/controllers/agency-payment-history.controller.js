const { newsAgencyDB } = require("../models");
const Agency_pay = newsAgencyDB.agency_pay;
const Agency = newsAgencyDB.agency;
const Op = newsAgencyDB.Sequelize.Op;
const Sequelize = require("sequelize");


// Create and Save a new agency_pay
exports.create = (req, res) => {
  // Validate request
  console.log(req.body);


  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a agency_pay
  const agency_pay = {
    name: req.body.name,
    agency_id: req.body.agency_id,
    is_active: req.body.is_active ? req.body.is_active : 0,

  };

  // Save agency_pay in the database
  Agency_pay.create(agency_pay)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the agency."
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

    Agency_pay.findAll()
      .then((agency_pay) => {
        return res.status(200).json(agency_pay)

      });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ 'error': 'internal server error' })

  }
};

// Find a single agency_pay with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log('paan' + id);
  Agency_pay.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find agency_pay with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving agency_pay with id=" + id
      });
    });
};

// Update a agency_pay by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  console.log(req.body);

  Agency_pay.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "agency_pay was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update agency_pay with id=${id}. Maybe agency_pay was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating agency_pay with id=" + id
      });
    });
};

// Delete a agency_pay with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Agency_pay.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "agency_pay was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete agency_pay with id=${id}. Maybe agency_pay was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete agency_pay with id=" + id
      });
    });
};

// Delete all agency_pays from the database.
exports.deleteAll = (req, res) => {
  Agency_pay.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} agency_pay were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all agency_pays."
      });
    });
};

// find all published agency
exports.findAllPublished = (req, res) => {
  Agency_pay.findAll({ where: { is_active: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving agency_pay_pays."
      });
    });
};
