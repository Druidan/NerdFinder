//Establish Dependancies
const express = require("express");

// Create an Express server
const app = express();
const PORT = process.env.PORT || 3010;

// St6andard Express setup for data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});