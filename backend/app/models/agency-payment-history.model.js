module.exports = (sequelize, Sequelize) => {
  const agency_pay = sequelize.define("agency_pays", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    agency_id: {
      type: Sequelize.INTEGER
    },
    receipt_no: {
      type: Sequelize.INTEGER
    },
    receipt_image: {
      type: Sequelize.INTEGER
    },
    payment_date: {
      field: 'payment_date',
      type: Sequelize.DATE,
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

  return agency_pay;
};
