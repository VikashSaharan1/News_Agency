module.exports = (sequelize, Sequelize) => {
  const distributer_detail = sequelize.define("distributer_details", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    mobileno: {
      type: Sequelize.INTEGER
    },
    alternateno: {
      type: Sequelize.INTEGER
    },
    address: {
      type: Sequelize.STRING
    },
    is_active: {
      type: Sequelize.INTEGER
    },
    createdAt: {
      field: 'created_at',
      type: Sequelize.DATE,
    },
    updatedAt: {
      field: 'modified_at',
      type: Sequelize.DATE,
    }, 
});

  return distributer_detail;
};
