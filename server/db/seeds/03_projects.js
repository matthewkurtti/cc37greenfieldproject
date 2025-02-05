exports.seed = async function (knex) {

  const stems = await knex("stems").select("id");

  await knex("projects").del();

  return knex("projects").insert([
    {
      id: 1,
      project_name: "Summer Collab",
      description: "Upbeat summer track collaboration",
      stem_id: stems[0].id,
    },
    {
      id: 2,
      project_name: "Love Fest",
      description: "Slow jam love song, needs vocals",
      stem_id: stems[1].id,
    },
    {
      id: 3,
      project_name: "Outrun",
      description: "smooth vaporwave classic, needs mastering",
      stem_id: stems[2].id,
    },
    {
      id: 4,
      project_name: "Alone...",
      description: "emo indie shoegaze",
      stem_id: stems[3].id,
    },
  ]);
};
