//Establish Dependancies
const nerdFriends = require(`../data/nerdFriends`)
const surveyQs = require(`../data/surveyQs`)

module.exports = function(app) {

    app.get("/api/surveyQs", function(req, res) {
        res.json(surveyQs); //Display the nerd friends data when visiting the api in JSON format.
    });

    //We creater the get request handler for our nerd friends api.
    app.get("/api/nerdFriends", function(req, res) {
        res.json(nerdFriends); //Display the nerd friends data when visiting the api in JSON format.
    });

    app.post("/api/nerdFriends", function(req, res) {
        nerdFriends.push(req.body);
        res.json(true);
    });

}



























//REFERENCE JS BEGINS BELOW

// ===============================================================================
// ROUTING
// ===============================================================================

// module.exports = function(app) {
//   // API GET Requests
//   // Below code handles when users "visit" a page.
//   // In each of the below cases when a user visits a link
//   // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
//   // ---------------------------------------------------------------------------



// //   app.get("/api/waitlist", function(req, res) {
// //     res.json(waitListData);
// //   });

//   // API POST Requests
//   // Below code handles when a user submits a form and thus submits data to the server.
//   // In each of the below cases, when a user submits form data (a JSON object)
//   // ...the JSON is pushed to the appropriate JavaScript array
//   // (ex. User fills out a reservation request... this data is then sent to the server...
//   // Then the server saves the data to the tableData array)
//   // ---------------------------------------------------------------------------



//   // ---------------------------------------------------------------------------
//   // I added this below code so you could clear out the table while working with the functionality.
//   // Don"t worry about it!

//   app.post("/api/clear", function(req, res) {
//     // Empty out the arrays of data
//     tableData.length = 0;
//     waitListData.length = 0;

//     res.json({ ok: true });
//   });
// };