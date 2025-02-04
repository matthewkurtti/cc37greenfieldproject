const express = require('express');
const cors = require('cors');
const path = require('path');
const knex = require('./knex');

const port = process.env.PORT || 8080;
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
} else {
  app.use('/', express.static(path.join(__dirname, '../../client/dist')));
}

app.use(express.json());

app.get('/api/user', async (req, res) => {
  res.json({ message: 'I got you 👍' });
});

app.listen(port, () => {
  console.log(`We can hear you over on port ${port} 👂`);
});
