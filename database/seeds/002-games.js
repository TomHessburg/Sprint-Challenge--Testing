
exports.seed = function(knex, Promise) {
  return knex('games').insert([
    {title: "game 1", genre: 'horror', releaseYear: 2012},
    {title: "game 2", genre: 'racing', releaseYear: 2002},
    {title: "game 3", genre: 'racing', releaseYear: 2016},
    {title: "game 4", genre: 'fantasy', releaseYear: 2015},
  ]);
};
