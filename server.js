//Establish Dependancies
const express = require("express");

// Create an Express server
const app = express();

// Establish an initial port.
const PORT = process.env.PORT || 8080;

// St6andard Express setup for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});