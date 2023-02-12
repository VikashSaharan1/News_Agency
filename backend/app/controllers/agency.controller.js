const { newsAgencyDB } = require("../models");
const Agency = newsAgencyDB.agency;
const Op = newsAgencyDB.Sequelize.Op;
const Sequelize = require("sequelize");


// Create and Save a new agency
exports.create = (req, res) => {
  // Validate request
  console.log(req.body);


  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a agency
  const agency = {
    name: req.body.name,
    is_active: req.body.is_active ? req.body.is_active : 0,

  };

  // Save agency in the database
  Agency.create(agency)
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

    Agency.findAll({
        where: where
    })
      .then((agencies) => {
        return res.status(200).json(agencies)

      });


  } catch (err) {
    console.log(err);
    return res.status(500).json({ 'error': 'internal server error' })

  }
};

// Find a single agency with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log('paan' + id);
  Agency.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find agency with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving agency with id=" + id
      });
    });
};

// Update a agency by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Agency.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "agency was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update agency with id=${id}. Maybe agency was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating agency with id=" + id
      });
    });
};

// Delete a agency with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Agency.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "agency was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete agency with id=${id}. Maybe agency was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete agency with id=" + id
      });
    });
};

// Delete all agencies from the database.
exports.deleteAll = (req, res) => {
  agency.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} agencies were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all citirs."
      });
    });
};

// find all published agency
exports.findAllPublished = (req, res) => {
  Agency.findAll({ where: { is_active: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving agencies."
      });
    });
};
