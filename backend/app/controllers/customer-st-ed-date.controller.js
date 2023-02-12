const { newsAgencyDB } = require("../models");
const Coustomer_st = newsAgencyDB.coustomer_st;
const Coustomer = newsAgencyDB.coustomer;
const Op = newsAgencyDB.Sequelize.Op;
const Sequelize = require("sequelize");


// Create and Save a new coustomer_st
exports.create = (req, res) => {
  // Validate request
  console.log(req.body);


  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a coustomer_st
  const coustomer_st = {
    name: req.body.name,
    customer_id: req.body.customer_id,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    is_active: req.body.is_active ? req.body.is_active : 0,

  };

  // Save coustomer_st in the database
  Coustomer_st.create(coustomer_st)
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

// Retrieve all coustomer_st from the database.
exports.findAll = async (req, res) => {

  try {
    let where = {};
    if (req.body.is_active != null) {
      where.is_active = req.body.is_active
    }
    if (req.body.state_id != null) {
      where.state_id = req.body.state_id
    }

    Coustomer_st.findAll()
      .then((coustomer_st) => {
        return res.status(200).json(coustomer_st)

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
  Coustomer_st.findByPk(id)
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

  Coustomer_st.update(req.body, {
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

  Coustomer_st.destroy({
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

// Delete all coustomer_sts from the database.
exports.deleteAll = (req, res) => {
  Coustomer_st.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} coustomer_st were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all coustomer_sts."
      });
    });
};

// find all published agency
exports.findAllPublished = (req, res) => {
  Coustomer_st.findAll({ where: { is_active: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving coustomer_st."
      });
    });
};
