/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
      .createTable('session', table => {
        table.string('sid').notNullable().primary();
        table.integer('user_id')  // Changed from uuid to integer
          .unsigned()             // Added unsigned since user id is unsigned
          .references('id')
          .inTable('users')
          .onDelete('CASCADE');
        table.json('sess').notNullable();
        table.timestamp('expire', { precision: 6 }).notNullable();
        
        // Create indexes
        table.index('expire', 'IDX_session_expire');
        table.index('user_id', 'IDX_session_user_id');
      });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('session');
  };