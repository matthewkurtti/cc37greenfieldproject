/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
      .createTable('project_stems', function(table) {
        table.integer('project_id')
          .unsigned()
          .references('id')
          .inTable('projects')
          .onDelete('CASCADE');
        table.integer('stem_id')
          .unsigned()
          .references('id')
          .inTable('stems')
          .onDelete('CASCADE');
        table.timestamps(true, true);
        // Make both columns together the primary key
        table.primary(['project_id', 'stem_id']);
      });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('project_stems');
  };
