/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('projects').del();
  await knex('projects').insert([
    {
      project_name: 'Love Pop',
      description: 'A simple love song'
    },
    {
      project_name: 'Down In The Dumps',
      description: 'YuSuK3!!',
    },
    {
      project_name: 'East Side Story',
      description: "a song about unrequited love! let's jam!",
    },
    {
      project_name: 'Neon Nights',
      description: "vaporwave lofi emo shoegaze need singer"
    },
    {
      project_name: 'Outrun',
      description: "vaporwave classic, needs editing and mastering"
    }
  ]);
};
