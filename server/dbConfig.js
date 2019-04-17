const knex = require('knex');

const db = require('../knexfile.js');
const dbConfig = knex(db.development);

module.exports = dbConfig;