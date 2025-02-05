require("dotenv").config();
const express = require("express");
const path = require('path');

const cors = require("cors");
const environment = process.env.NODE_ENV || 'development';
const config = require("./knexfile.js")[environment];
const knex = require("knex")(config);

const app = express();

// middleware
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;

// "server is working" preliminary test
app.get("/ping", (req, res) => {
    console.log("Ping received");
    res.json({ message: "pong" });
  });

startServer();

/* ------- testing & development endpoints --------*/

// "post" testing endpoint (create) (query)
app.post("/testPost/", async (req, res) => {
    if (req.query.testQuery === "briggs") {
      return res.json({
        message: "Test data returned successfully",
        data: "Some data was returned"
      });
    } else {
      return res.status(400).json({
        error: "Invalid query. Please provide testQuery: briggs for testing.",
      });
    }
  });

// "get" testing endpoint (read)
app.get("/test/", async (req, res) => {
  try {
    res.json({ message: "Get route is working correctly." });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: error.message });
  }
});

// "put" testing endpoint (update)



// "delete" testing endpoint (delete)

// ---------- Authentication ---------- */ 

// POST /api/auth/register
// it (should allow a new user to register)

// POST /api/auth/login
// it (should allow the user to login once registered)

// POST /api/auth/logout
// it (should log the user out)

// ---------- Project ---------- */ 

// POST api/post/project 
// it (should allow the user to create a new project)


// ---------- Content ---------- */ 

// POST api/stems/ 
// it (should allow the user to upload a stem to Google Drive)

// GET api/stems/:stemID
// it (should get a particular stem by id)

// GET api/get/allStems
// it (should all stems for a selected project)

// GET api/stems/:stemID/download
// it (should allow the user to download a stem)

// ---------- Team ---------- */ 

// POST api/team
// it (should allow the user to join a team)

// PUT api/team/leave
// it (should allow the user to leave a team)

// PUT api/team/:id
// it should allow the user to change teams


/* ---------- WISHLIST ---------- */ 

// GET api/get/myStems 
// it (should return all stems the user has uploaded)

// GET api/get/userStems
// it (should return all stems the user has access to)

// Update stem metadata

// Update title and track information



/* ---------- live endpoints ---------- */


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
