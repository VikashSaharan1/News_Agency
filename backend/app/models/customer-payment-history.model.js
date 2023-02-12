module.exports = (sequelize, Sequelize) => {
  const coustomer_pay = sequelize.define("coustomer_pays", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    cust_id: {
      type: Sequelize.INTEGER
    },
    payment_date: {
      type: Sequelize.STRING
    },
    receipt_no: {
      type: Sequelize.INTEGER
    },
    payment_amount: {
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

  return coustomer_pay;
};
