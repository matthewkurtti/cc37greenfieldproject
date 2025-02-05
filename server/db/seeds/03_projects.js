exports.seed = async function (knex) {
  // Get the stem IDs first
  const stems = await knex("stems").select("id");

  await knex("projects").del();
  return knex("projects").insert([
    {
      project_name: "Summer Collab",
      description: "Upbeat summer track collaboration",
      stem_id: stems[0].id,
    },
    {
      project_name: "Summer Collab",
      description: "Upbeat summer track collaboration",
      stem_id: stems[1].id,
    },
  ]);
};
