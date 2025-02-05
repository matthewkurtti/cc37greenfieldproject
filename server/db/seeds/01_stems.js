exports.seed = async function (knex) {
  await knex("stems").del();

  return knex("stems").insert([
    { 
        id: 1,
        stem_name: "Guitar Track", url: "https://storage.example.com/guitar-1" 
    },
    { 
        id: 2,
        stem_name: "Drums Basic", url: "https://storage.example.com/drums-1" 
    },
    { 
        id: 3,
        stem_name: "Harmonies", url: "https://storage.example.com/bass-1"
    },
    { 
        id: 4,
        stem_name: "Guitar Rythm", url: "https://storage.example.com/bass-1"
    },
    { 
        id: 5,
        stem_name: "Guitar Solo", url: "https://storage.example.com/bass-1"
    },
    { 
        id: 6,
        stem_name: "Vocals", url: "https://storage.example.com/bass-1"
    },
  ]);
};
