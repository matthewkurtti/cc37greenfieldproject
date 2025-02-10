/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('projects', function (table) {
    table.increments('id').primary();
    table.integer('leader_id').notNullable();
    table.string('project_name', 30);
    table.text('description', 100).comment('brief project description');
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('projects');
};
