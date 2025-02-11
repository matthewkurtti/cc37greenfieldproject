/* Helper function for generating random names for placeholders */

export const randomName = () => {
  const firstNames: string[] = [
    'Aria',
    'Lyria',
    'Sonny',
    'Miles',
    'Cadence',
    'Viola',
    'Jazzlyn',
    'Allegra',
    'Harmony',
    'Rocco',
  ];

  const lastNames: string[] = [
    'Bachman',
    'Reed',
    'Chordia',
    'Rollins',
    'Dion',
    'Winehouse',
    'Harmon',
    'Chorale',
    'Sonata',
    'Elegia',
  ];

  let randomNumberFirstName: number = Math.floor(
    Math.random() * firstNames.length
  );
  let randomNumberSecondName: number = Math.floor(
    Math.random() * lastNames.length
  );

  let randomFirstName: string = firstNames[randomNumberFirstName];
  let randomLastName: string = lastNames[randomNumberSecondName];

  return `${randomFirstName} ${randomLastName}`;
};
