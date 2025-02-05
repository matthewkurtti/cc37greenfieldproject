exports.seed = async function (knex) {
  await knex("users").del();

  return knex("users").insert([
    {
      id: 1,
      username: "johnmusic",
      password: "$2b$10$dummyhash",
      city: "London",
      country: "UK",
    },
    {
      id: 2,
      username: "love and...",
      password: "sYhMGb5b8n5wlif",
      city: "nagano",
      country: "japan",
    },
    {
      id: 3,
      username: "lala inoue",
      password: "tCaGLnPG9R7OmMp",
      city: "nagano",
      country: "japan",
    },
    {
      id: 4,
      username: "ApogeeBandOfficial",
      password: "MrHhptE3CoL4Mny",
      city: "suzaka",
      country: "japan",
    },
    {
      id: 5,
      username: "AND2018_GO",
      password: "UPxyfOmUO8tLONq",
      city: "nagano",
      country: "japan",
    },
  ]);
};
