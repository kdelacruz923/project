require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");

if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined.');
  process.exit(1);
}

// Connect to the database
db.mongoose
.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

var corsOptions = { origin: "http://localhost:3001" };

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to BookStore application." });
// });

//added for deployment
const path = require("path");

if (process.env.NODE_ENV === "production") {

    app.use(express.static("client/build"));

    app.get("*", (req, res) => {

    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));

   });

}

// Import the auth routes
const authRoutes = require('./app/routes/auth.routes'); // Adjust the path as necessary

// Use Auth Routes
app.use('/api', authRoutes);

// Import other routes
require("./app/routes/product.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
