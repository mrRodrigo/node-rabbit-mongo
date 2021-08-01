const { expect } = require('chai');
const BadRequestException = require('src/infra/exceptions/BadRequestException');
const Exception = require('src/infra/exceptions/Exception');

describe('Exceptions :: BadRequestException', () => {
    describe('validate instance', () => {
        it('returns not found instance', () => {
            const notFoundException = new BadRequestException('error_message');

            expect(notFoundException).to.be.instanceOf(BadRequestException);
            expect(notFoundException).to.be.instanceOf(Exception);
            expect(notFoundException).to.be.instanceOf(Error);
        });
    });

    describe('using string error', () => {
        it('returns notFoundException error', () => {
            const notFoundException = new BadRequestException('error_message');

            expect(notFoundException.code).to.be.equals('400');
            expect(notFoundException).to.be.haveOwnProperty('stack');
        });
    });

    describe('using error instance', () => {
        it('returns notFoundException error', () => {
            const notFoundException = new BadRequestException(new Error('error_message'));

            expect(notFoundException.code).to.be.equals('400');
            expect(notFoundException).to.be.haveOwnProperty('stack');
        });
    });

    describe('using error instance with custom code', () => {
        it('returns notFoundException error', () => {
            const error = new Error('error_message');
            error.code = '1-400';
            const notFoundException = new BadRequestException(error);

            expect(notFoundException.code).to.be.equals('400');
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
            const notFoundException = new BadRequestException(error);
            expect(notFoundException.code).to.be.equals('400');
            expect(notFoundException).to.be.haveOwnProperty('stack');
        });
    });
});
