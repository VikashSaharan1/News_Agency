module.exports = (sequelize, Sequelize) => {
  const coustomer_st = sequelize.define("coustomer_st", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    cust_id: {
      type: Sequelize.INTEGER
    },
    start_date: {
      field: 'start_date',
      type: Sequelize.DATE,
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

  return coustomer_st;
};
