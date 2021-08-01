const { expect } = require('chai');

const Exception = require('src/infra/exceptions/Exception');

describe('Exceptions :: Exception', () => {
    describe('validate instance', () => {
        let error;

        beforeEach(() => {
            error = new Error('error_message');
        });

        it('returns Exception/Error instance', () => {
            const exception = new Exception(error);

            expect(exception).to.be.instanceOf(Exception);
            expect(exception).to.be.instanceOf(Error);
        });
    });

    describe('validate exception', () => {
        let defaultErrorCode;
		
        it('returns error', () => {
            const error = 'error_message';

            const exception = new Exception(error, defaultErrorCode);
            expect(exception.message).to.be.equals('error_message');
            expect(exception).to.be.haveOwnProperty('stack');
        });
    });
});
