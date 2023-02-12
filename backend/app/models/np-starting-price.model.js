module.exports = (sequelize, Sequelize) => {
  const np_start_price = sequelize.define("np_start_price", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    start_date: {
      field: 'start_date',
      type: Sequelize.DATE,
    },
    per_copy_price: {
      type: Sequelize.STRING
    },
    end_date: {
      field: 'end_date',
      type: Sequelize.DATE,
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

  return np_start_price;
};
