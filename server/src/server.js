const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const bcrypt = require('bcrypt');
const cors = require('cors');
const path = require('path');
const knex = require('./knex');

const app = express();

// ---------- Middleware (START) ---------- */
if (!process.env.NODE_ENV) {
  app.use(cors());
} else {
  app.use('/', express.static(path.join(__dirname, '../../client/dist')));
}

app.use(express.json());

app.use(
  session({
    store: new pgSession({
      conString:
        process.env.DATABASE_URL ||
        `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // What does this do, might cause deployment issues
    cookie: { secure: false },
  })
);
// ----------- Middleware (END) ----------- */

// "get" testing endpoint (get all users)
app.get('/api/user', async (req, res) => {
  try {
    const users = await knex.select('*').from('users').limit(100);
    res.json(users);
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/user/:id', async (req, res) => {
  console.log('GOT HERE');
  try {
    const id = req.params.id;
    await knex('users').where('id', id).del();
    res.json({ message: 'Delete route is working correctly.' });
  } catch (error) {
    console.error('Database connection error.', error);
    res.status(500).json({ error: error.message });
  }
});

// "get" testing endpoint (read)
app.get('/test/', async (req, res) => {
  try {
    res.json({ message: 'Get route is working correctly.' });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: error.message });
  }
});

// "put" testing endpoint (update)
app.put('/test/', async (req, res) => {
  try {
    res.json({ message: 'Put route is working correctly.' });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: error.message });
  }
});

// "delete" testing endpoint (delete)
app.delete('/delete', async (req, res) => {
  try {
    res.json({ message: 'Delete route is working correctly.' });
  } catch (error) {
    console.error('Database connection error.', error);
    res.status(500).json({ error: error.message });
  }
});

// ---------- Authentication (START) ---------- */

// POST /api/auth/register
// it (should allow a new user to register)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password, city, country } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await knex('users')
      .insert({
        username,
        password: hashedPassword,
        city,
        country,
      })
      .returning(['id', 'username', 'city', 'country']);

    res
      .status(201)
      .json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Database connection errror.', error);
    res.status(500).json({ errror: error.message });
  }
});

// POST /api/auth/login
// it (should allow an existing user to login)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await knex('users').where({ username }).first();

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
    console.error('Database connection error.', error);
    res.status(500).json({ error: error.message });
  }
});

// Checks if a user is logged in
// it (should fetch logged in users profile from database using the userId stored in the session)
app.get('/api/user/profile', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  knex('users')
    .where({ id: req.session.userId })
    .first()
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ user });
    })
    .catch((error) => {
      console.error('Database connection error.', error);
      res.status(500).json({ error: error.message });
    });
});

// GET /api/auth/logout
// it (should log the user out)
app.get('/api/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to logout' });
    }
    res.json({ message: 'Logout  successful' });
  });
});
// ----------- Authentication (END) ----------- */

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/dist/index.html'));
// });

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`We can hear you over on port ${port} 👂`);
});
