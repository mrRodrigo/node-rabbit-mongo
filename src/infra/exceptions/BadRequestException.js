const Exception = require('./Exception');
const defaultErrorCode = '400';

module.exports = class BadRequestException extends Exception {
    constructor(message, { details = {} } = {}) {
        super(message, defaultErrorCode);
		this.details = details;
    }
};
