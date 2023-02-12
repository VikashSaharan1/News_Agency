module.exports = (sequelize, Sequelize) => {
  const customer = sequelize.define("customers", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    mobileno: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    whatsappno: {
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

  return customer;
};
