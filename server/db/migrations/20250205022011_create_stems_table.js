/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
      .createTable("stems", function(table) {
        table.increments("id").primary();
        table.string("stem_name");
        table.string("url");
        table.timestamps(true, true);
      })
      .then(() => {
        return knex.schema.alterTable("projects", function(table) {
          table.integer("stem_id") 
            .unsigned() // unsigned prevents negative values
            .nullable(); // doesn't have to have a value currently
          table
            .foreign("stem_id") // link it to the 'id' column of 'stems' table
            .references("id")
            .inTable("stems")
            .onDelete("SET NULL");
        });
      });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema
      .alterTable("projects", function(table) {
        table.dropForeign("stem_id");
        table.dropColumn("stem_id");
      })
      .then(() => {
        return knex.schema.dropTable("stems");
      });
  };
  