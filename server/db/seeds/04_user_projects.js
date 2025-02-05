exports.seed = async function(knex) {

    const users = await knex('users').select('id'); // get existing user IDs 
    const projects = await knex('projects').select('id'); // get existing project IDs
    
    await knex('user_projects').del();
    return knex('user_projects').insert([
      { 
        user_id: users[0].id, 
        project_id: projects[0].id 
      },
      { 
        user_id: users[1].id, 
        project_id: projects[2].id 
      },

    ]);
  };
