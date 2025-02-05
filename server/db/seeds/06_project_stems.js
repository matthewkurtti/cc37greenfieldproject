exports.seed = async function(knex) {

  const [stems, projects] = await Promise.all([
    knex('stems').select('id', 'stem_name'),
    knex('projects').select('id', 'project_name')
  ]);
  

  if (!stems.length || !projects.length) { // validation
    throw new Error('Missing required stems or projects data');
  }

  // delete existing records
  await knex('project_stems').del();
  
  // now create relationships
  return knex('project_stems').insert([
    {
      project_id: projects[0].id,  
      stem_id: stems[0].id
    },
    {
      project_id: projects[1].id, 
      stem_id: stems[1].id
    },
    {
      project_id: projects[2].id, 
      stem_id: stems[2].id
    },
    {
      project_id: projects[1].id,
      stem_id: stems[5].id
    }
  ]);
};