process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const configs = require('./' + process.env.NODE_ENV || {});

module.exports = configs;
