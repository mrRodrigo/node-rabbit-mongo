const { expect } = require('chai');
const BusinessException = require('src/infra/exceptions/BusinessException');
const Exception = require('src/infra/exceptions/Exception');

describe('Exceptions :: BusinessException', () => {
    describe('validate instance', () => {
        it('returns not found instance', () => {
            const notFoundException = new BusinessException('error_message');

            expect(notFoundException).to.be.instanceOf(BusinessException);
            expect(notFoundException).to.be.instanceOf(Exception);
            expect(notFoundException).to.be.instanceOf(Error);
        });
    });

    describe('using string error', () => {
        it('returns notFoundException error', () => {
            const notFoundException = new BusinessException('error_message');

            expect(notFoundException.code).to.be.equals('422');
            expect(notFoundException).to.be.haveOwnProperty('stack');
        });
    });

    describe('using error instance', () => {
        it('returns notFoundException error', () => {
            const notFoundException = new BusinessException(new Error('error_message'));

            expect(notFoundException.code).to.be.equals('422');
            expect(notFoundException).to.be.haveOwnProperty('stack');
        });
    });

    describe('using error instance with custom code', () => {
        it('returns notFoundException error', () => {
            const error = new Error('error_message');
            error.code = '1-422';
            const notFoundException = new BusinessException(error);

            expect(notFoundException.code).to.be.equals('422');
            expect(notFoundException).to.be.haveOwnProperty('stack');
        });
    });

    describe('using error instance with details property', () => {
        it('returns notFoundException error', () => {
            const error = new Error('error_message');
            error.details = [
                { message: 'error_message_1' },
                { message: 'error_message_2' }
            ];
            const notFoundException = new BusinessException(error);
            expect(notFoundException.code).to.be.equals('422');
            expect(notFoundException).to.be.haveOwnProperty('stack');
        });
    });
});
