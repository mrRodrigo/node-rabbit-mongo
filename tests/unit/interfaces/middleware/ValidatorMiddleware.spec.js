const { expect, spy } = require('chai');
const Joi = require('joi');
const ValidatorMiddleware = require('src/interfaces/middleware/ValidatorMiddleware');

describe('Interfaces :: Http :: Middlewares :: ValidatorMiddleware', () => {
    let validation;
    const { validateContract } = ValidatorMiddleware();
    describe('#validateContract', () => {

        before(() => {
            validation = {
                params: Joi.object().keys({
                    any_id: Joi.string().required()
                })
            };
        });

        context('when middleware is called successful', () => {

            let next;
            beforeEach(() => next = spy(() => undefined));

            it('overwrite request with only schematized values and call next middleware', () => {
                const req = {
                    params: {
                        any_id: 'any_string_value',
                        another_field: 'will_be_ignored'
                    }
                };

                expect(validateContract(validation)(req, null, next)).to.be.undefined();
                expect(next).to.have.been.called.once.with();
                expect(req.params).to.haveOwnProperty('any_id');
                expect(req.params).to.not.haveOwnProperty('another_field');
                expect(req.params.any_id).to.be.equal('any_string_value');
            });
        });

        context('when middleware is called unsuccessful', () => {

            let next;
            beforeEach(() => {
                next = spy((error) => {
                    return error;
                });
            });

            it('throw exception and call next middleware', () => {
                const req = {
                    params: {
                        any_id: 123
                    }
                };

                validateContract(validation)(req, null, next);
                expect(next).to.have.been.called.once();

                const [[error]] = next.__spy.calls;
                expect(error.message).to.be.equal('Bad Request');
            });
        });
    });
});
