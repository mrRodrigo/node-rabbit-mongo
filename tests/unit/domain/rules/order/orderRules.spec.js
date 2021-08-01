const { expect } = require('chai');
const OrderRules = require('src/domain/rules/order/orderRules');

describe('domain :: rules :: orderRules ', () => {

	describe('#validateFoundProducts', () => {
		let validateFoundProducts;

		before(() => {	
			const rules = OrderRules();
			validateFoundProducts = rules.validateFoundProducts;
		});

		describe('when is valid', () => { 
			it('return isValid true', () => {
				const requestOrder = { 
					products: [{
						name: 'kiwi',
						quantity: 2
					}]
				};
				const databaseProducts = [{
					name: 'kiwi',
					price: 1,
					quantity: 2
				}];

				const validation = validateFoundProducts({ requestOrder, databaseProducts });

				expect(validation.isValid).to.be.true();
				expect(validation.error).to.be.undefined();
				expect(validation.hasNextValidation).to.be.true();
			});
		});

		describe('when is not valid', () => { 
			it('return isValid false', () => {
				const requestOrder = { 
					products: [{
						name: 'apple',
						quantity: 2
					}]
				};
				const databaseProducts = [{
					name: 'kiwi',
					price: 1,
					quantity: 2
				}];

				const validation = validateFoundProducts({ requestOrder, databaseProducts });

				expect(validation.isValid).to.be.false();
				expect(validation.error.message).to.be.eql('A certain product was not found.');
				expect(validation.hasNextValidation).to.be.false();
			});
		});
	});

	describe('#validateFoundProducts', () => {
		let validateQuantity;

		before(() => {	
			const rules = OrderRules();
			validateQuantity = rules.validateQuantity;
		});

		describe('when is valid', () => { 
			it('return isValid true', () => {
				const requestOrder = { 
					products: [{
						name: 'kiwi',
						quantity: 2
					}]
				};
				const databaseProducts = [{
					name: 'kiwi',
					price: 1,
					quantity: 2
				}];

				const validation = validateQuantity({ requestOrder, databaseProducts });

				expect(validation.isValid).to.be.true();
				expect(validation.error).to.be.undefined();
				expect(validation.hasNextValidation).to.be.true();
			});
		});

		describe('when is not valid', () => { 
			it('return isValid false', () => {
				const requestOrder = { 
					products: [{
						name: 'apple',
						quantity: 2
					}]
				};
				const databaseProducts = [];

				const validation = validateQuantity({ requestOrder, databaseProducts });

				expect(validation.isValid).to.be.false();
				expect(validation.error.message).to.be.eql('A certain product does not have the requested quantity.');
				expect(validation.hasNextValidation).to.be.false();
			});
		});
	});
});
