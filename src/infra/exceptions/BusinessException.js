const Exception = require('./Exception');
const defaultErrorCode = '422';

module.exports = class BusinessException extends Exception {
    constructor(message) {
        super(message, defaultErrorCode);
    }
};
