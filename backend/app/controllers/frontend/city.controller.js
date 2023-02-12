const { globalMastersDB } = require("../../models");
const City = globalMastersDB.city;


// find all published City
exports.findAllPublished = (req, res) => {
  City.findAll({ 
    attributes: ['id', 'name'],
    where: { is_active: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cities."
      });
    });
};
