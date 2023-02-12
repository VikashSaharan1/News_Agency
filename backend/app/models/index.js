const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
/*const {MongoClient} = require('mongodb');
const uri = "mongodb://localhost/mydb";
const mongodbConnObj = new MongoClient(uri);*/


const newsAgencySequelize = new Sequelize(dbConfig[0].DB, dbConfig[0].USER, dbConfig[0].PASSWORD, {
  host: dbConfig[0].HOST,
  dialect: dbConfig[0].dialect,
  operatorsAliases: false,
  
  pool: {
    max: dbConfig[0].pool.max,
    min: dbConfig[0].pool.min,
    acquire: dbConfig[0].pool.acquire,
    idle: dbConfig[0].pool.idle
  }
});



const newsAgencyDB = {};


newsAgencyDB.Sequelize = Sequelize;
newsAgencyDB.sequelize = newsAgencySequelize;


newsAgencyDB.agency = require("./agency.model.js")(newsAgencySequelize, Sequelize);
newsAgencyDB.agency_pay = require("./agency-payment-history.model.js")(newsAgencySequelize, Sequelize);
newsAgencyDB.coustomer_pay = require("./customer-payment-history.model.js")(newsAgencySequelize, Sequelize);
newsAgencyDB.distributer_detail = require("./distributer-details.model.js")(newsAgencySequelize, Sequelize);
newsAgencyDB.customer = require("./customer.model.js")(newsAgencySequelize, Sequelize);
newsAgencyDB.news_paper = require("./news-paper.model.js")(newsAgencySequelize, Sequelize);
newsAgencyDB.np_start_price = require("./np-starting-price.model.js")(newsAgencySequelize, Sequelize);
newsAgencyDB.coustomer_st = require("./customer-st-ed-date.model.js")(newsAgencySequelize, Sequelize);
                                                                                  
//newsAgencyDB.ROLES = ["user", "admin", "moderator"];

//newsAgencyDB.city.hasMany(institutionsDB.institution_contact, { as:  'cities', foreignKey: "city_id" });
//institutionsDB.institution_contact.belongsTo(newsAgencyDB.city, { as:  'cities', foreignKey: "city_id" });



async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function main(){
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   *
  //const uri = "mongodb+srv://<username>:<password>@<your-cluster-url>/test?retryWrites=true&w=majority";
  */

  

  try {
      // Connect to the MongoDB cluster
      await mongodbConnObj.connect();

      // Make the appropriate DB calls
      await  listDatabases(mongodbConnObj);

  } catch (e) {
      console.error(e);
  } 
}

//main().catch(console.error);

module.exports = {
  newsAgencyDB,
  // mongodbConnObj

}
