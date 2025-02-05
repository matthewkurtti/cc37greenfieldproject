exports.seed = async function (knex) {
  await knex("stems").del();
  return knex("stems").insert([
    { stem_name: "Guitar Track", url: "https://storage.example.com/guitar-1" },
    { stem_name: "Drums Basic", url: "https://storage.example.com/drums-1" },
    { stem_name: "Bass Line", url: "https://storage.example.com/bass-1" },
  ]);
};
