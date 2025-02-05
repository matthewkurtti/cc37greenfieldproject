/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  
  await knex('users').insert([
    {
      user_name: 'lala',
      password: 'password1',
      city: 'nagano',
      country: 'japan'
    },
    {
      user_name: 'yusuke',
      password: 'password2',
      city: 'tokyo',
      country: 'japan'
    },
    {
      user_name: 'davis',
      password: 'password3',
      city: 'seattle',
      country: 'us'
    },
    {
      user_name: 'jesus',
      password: 'password4',
      city: 'motoazabu',
      country: 'japan'
    },
    {
      user_name: 'joe',
      password: 'password5',
      city: 'motoazabu',
      country: 'japan'
    },
    {
      user_name: 'damien',
      password: 'password6',
      city: 'motoazabu',
      country: 'japan'
    }
  ]);
};