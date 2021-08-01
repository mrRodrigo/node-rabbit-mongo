const { expect } = require('chai');
const NotFoundException = require('src/infra/exceptions/NotFoundException');
const Exception = require('src/infra/exceptions/Exception');

describe('Exceptions :: NotFoundException', () => {
    describe('validate instance', () => {
        it('returns not found instance', () => {
            const notFoundException = new NotFoundException('error_message');

            expect(notFoundException).to.be.instanceOf(NotFoundException);
            expect(notFoundException).to.be.instanceOf(Exception);
            expect(notFoundException).to.be.instanceOf(Error);
        });
    });

    describe('using string error', () => {
        it('returns notFoundException error', () => {
            const notFoundException = new NotFoundException('error_message');

            expect(notFoundException.code).to.be.equals('404');
            expect(notFoundException).to.be.haveOwnProperty('stack');
        });
    });

    describe('using error instance', () => {
        it('returns notFoundException error', () => {
            const notFoundException = new NotFoundException(new Error('error_message'));

            expect(notFoundException.code).to.be.equals('404');
            expect(notFoundException).to.be.haveOwnProperty('stack');
        });
    });

    describe('using error instance with custom code', () => {
        it('returns notFoundException error', () => {
            const error = new Error('error_message');
            error.code = '1-404';
            const notFoundException = new NotFoundException(error);

            expect(notFoundException.code).to.be.equals('404');
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
            const notFoundException = new NotFoundException(error);
            expect(notFoundException.code).to.be.equals('404');
            expect(notFoundException).to.be.haveOwnProperty('stack');
        });
    });
});
