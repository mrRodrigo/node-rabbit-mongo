process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const setting = require('./' + process.env.NODE_ENV || {});

module.exports = setting;
