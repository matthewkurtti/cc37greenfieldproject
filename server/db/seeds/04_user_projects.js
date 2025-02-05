exports.seed = async function(knex) {

    const users = await knex('users').select('id'); // get existing user IDs 
    const projects = await knex('projects').select('id'); // get existing project IDs
    
    await knex('user_projects').del();
    return knex('user_projects').insert([
      { 
        user_id: 1, 
        project_id: 2
      },
      { 
        user_id: 2, 
        project_id: 3
      },

    ]);
  };
