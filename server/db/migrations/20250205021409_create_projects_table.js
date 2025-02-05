/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// 'unsigned' method prevents negative numbers being assigned to that field
// not strictly necessary but used to ensure ids are 'clean'

exports.up = function (knex) {
    return knex.schema.createTable("projects", function (table) {
      table.increments("id").primary();
      table.string("project_name", 30);
      table.text("description", 100).comment("brief project description");
      table.integer("stem_id")  
        .unsigned()
        .nullable()
        .comment("the stem assigned to this project");
      table.foreign("stem_id")  
        .references("id")
        .inTable("stems")
        .onDelete("SET NULL");
      table.timestamps(true, true);
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema
      .table("projects", table => {
        table.dropForeign("stem_id");
      })
      .then(() => {
        return knex.schema.dropTable("projects");
      });
  };