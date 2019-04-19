//Establish Dependancies
const path = require("path");

module.exports = function(app) {

    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/tables.html"));
    });

    // If no matching route is found default to home
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
};