/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("projects", function (table) {
    table.increments("id").primary();
    table.string("project_name", 30);
    table.text("description", 100).comment("brief project description");
    table
      .integer("stem_ids")
      .unsigned()
      .comment("the stems assigned to this project");
    // .unsigned() method prevents negative number assignments for later table alteration to fk
    table.timestamps(true, true); // this adds both created_at and updated_at as a built in function
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("projects");
};
