/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("stems", function (table) {
    table.increments("id").primary();
    table.string("stem_name");
    table.string("url");
    table.timestamps(true, true);
  });
};

// TODO add cascade to stems deletion

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("stems");
};
