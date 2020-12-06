const knex = require('knex');

const knexfile = require('../knexfile.js');

const configuredKnex = process.env.NODE_ENV || "development";

module.exports = configuredKnex;