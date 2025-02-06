exports.seed = async function (knex) {
  await knex('users').del();

  return knex('users').insert([
    {
      username: 'johnmusic',
      password: '$2b$10$dummyhash',
      city: 'London',
      country: 'UK',
    },
    {
      username: 'love and...',
      password: 'sYhMGb5b8n5wlif',
      city: 'nagano',
      country: 'japan',
    },
    {
      username: 'lala inoue',
      password: 'tCaGLnPG9R7OmMp',
      city: 'nagano',
      country: 'japan',
    },
    {
      username: 'ApogeeBandOfficial',
      password: 'MrHhptE3CoL4Mny',
      city: 'suzaka',
      country: 'japan',
    },
    {
      username: 'AND2018_GO',
      password: 'UPxyfOmUO8tLONq',
      city: 'nagano',
      country: 'japan',
    },
  ]);

  await knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));");
};
