exports.seed = async function (knex) {

  const stems = await knex("stems").select("id");

  await knex("projects").del();

  return knex("projects").insert([
    {
      id: 1,
      project_name: "Summer Collab",
      description: "Upbeat summer track collaboration",
    },
    {
      id: 2,
      project_name: "Love Fest",
      description: "Slow jam love song, needs vocals",
    },
    {
      id: 3,
      project_name: "Outrun",
      description: "smooth vaporwave classic, needs mastering",
    },
    {
      id: 4,
      project_name: "Alone...",
      description: "emo indie shoegaze",
    },
  ]);
};
