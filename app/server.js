// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "add.html"));
});

// Get all users
app.get("/all", function(req, res) {
  res.json(users);
});

// Search for Specific Character (or all users) - provides JSON
app.get("/api/:users?", function(req, res) {
  var chosen = req.params.users;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < users.length; i++) {
      if (chosen === users[i].routeName) {
        return res.json(users[i]);
      }
    }
    return res.json(false);
  }
  return res.json(users);
});

// Create New user - takes in JSON input
app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newuser = req.body;
  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newuser.routeName = newuser.name.replace(/\s+/g, "").toLowerCase();

  console.log(newuser);

  user.push(newuser);

  res.json(newuser);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
