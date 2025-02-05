/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('stems').del(); 
  
  let idIncrement = 0; 
  
  await knex('stems').insert([ 
    {
      id: ++idIncrement,
      stem_name: 'lovebuzz_guitar'
    },
    {
      id: ++idIncrement,
      stem_name: 'lovebuzz_vocals'
    },
    {
      id: ++idIncrement,
      stem_name: 'lovebuzz_drums'
    },
    {
      id: ++idIncrement,
      stem_name: 'lovebuzz_harmony'
    },
    {
      id: ++idIncrement,
      stem_name: 'lovebuzz_bass'
    },
    {
      id: ++idIncrement,
      stem_name: 'new pop track vocals'
    }
  ]);
};