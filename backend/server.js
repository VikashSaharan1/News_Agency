const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const { newsAgencyDB } = require("./app/models");
const Role = newsAgencyDB.role;

/* newsAgencyDB.sequelize.sync()
  .then(() => {
    console.log("Synced db.ss");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
*/

// // drop the table if it already exists
newsAgencyDB.sequelize.sync({ force: false }).then(() => {
   console.log("Drop and re-sync db.");
  // initial();
 });

 function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to News Agency." });
});

require("./app/routes/agency.routes")(app);
require("./app/routes/agency-payment-history.routes")(app);
require("./app/routes/customer.routes")(app);
require("./app/routes/customer-payment-history.routes")(app);
require("./app/routes/news-paper.routes")(app);
require("./app/routes/np-starting-price.routes")(app);
require("./app/routes/distributer-details.routes")(app);
require("./app/routes/customer-st-ed-date.routes")(app);



global.__basedir = __dirname;
// set port, listen for requests
const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
