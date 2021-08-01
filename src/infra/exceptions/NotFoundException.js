const Exception = require('./Exception');
const defaultErrorCode = '404';

module.exports = class NotFoundException extends Exception {
    constructor(message) {
        super(message, defaultErrorCode);
    }
};
