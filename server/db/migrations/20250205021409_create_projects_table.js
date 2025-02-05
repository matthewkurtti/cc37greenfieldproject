/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("projects", function (table) {
      table.increments("id").primary();
      table.string("project_name", 30);
      table.string("stem_id"); // adds stem_id for foreign key relation
      table.text("description", 100).comment("brief project description");
      table.timestamps(true, true);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("projects");
  };