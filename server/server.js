require("dotenv").config();
const express = require("express");
const path = require('path');

const cors = require("cors");
const environment = process.env.NODE_ENV || 'development';
const config = require("./knexfile.js")[environment];
const knex = require("knex")(config);
const bcrypt = require('bcrypt');

const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);

const app = express();

// middleware
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());
app.use(cors());
app.use(session({
  store: new pgSession({
    pool: knex.client.pool,
    tableName: 'session'
  }),
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

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
app.put('/test/', async (req,res) => {
  try{
    res.json({ message: "Put route is working correctly."});
  } catch(error){
    console.error("Database connection error:", error);
    res.status(500).json({ error: error.message });
  }
});


// "delete" testing endpoint (delete)
app.delete('/delete', async (req,res) => {
  try{
    res.json({ message: "Delete route is working correctly."});
  } catch(error){
    console.error("Database connection error.", error);
    res.status(500).json({ error: error.message });
  }
});
// ---------- Authentication ---------- */ 

// POST /api/auth/register
// it (should allow a new user to register)
app.post('/api/auth/register', async (req, res) => {
  try{
    const { username, password, city, country} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await knex('users')
      .insert({
        username,
        password:hashedPassword,
        city,
        country
      })
      .returning(['id','username','city','country']);
    
    res.status(201).json({ message: 'User registered successfully', user:newUser });
  } catch (error) {
    console.error("Database connection errror.", error);
    res.status(500).json({ errror: error.message });
  }
});
// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
  
    const user = await knex('user')
      .where({ username })
      .first();

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.session.userId = user.id;
    req.session.username = user.username;

    res.json({ message: 'Login succesful' });
  } catch (error) {
    console.error("Database connection error.", error);
    res.status(500).json({ error: error.message });
  }
})
// POST /api/auth/logout
// it (should log the user out) 
app.post('/api/auth/logout', (req, res) => {
  req.sessionID.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to logout'});
    }
    res.json({ message: 'Logout  successful' })
  })
})

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
