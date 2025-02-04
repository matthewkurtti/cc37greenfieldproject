const express = require('express');
const cors = require('cors');
const path = require('path');
const knex = require('./knex');

const app = express();

if (!process.env.NODE_ENV) {
  app.use(cors());
} else {
  app.use('/', express.static(path.join(__dirname, '../../client/dist')));
}

app.use(express.json());

app.get('/api/user', async (req, res) => {
  const users = await knex.select('*').from('users').limit(100);

  res.json(users);
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`We can hear you over on port ${port} 👂`);
});
