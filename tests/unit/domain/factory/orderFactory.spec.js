const { expect } = require('chai');
const OrderFactory = require('src/domain/factory/orderFactory');

describe('domain :: factory :: orderFactory ', () => {
	describe('#toDatabase', () => {
		let orderFactory;

		before(() => {
			orderFactory = OrderFactory();
		});

		describe('when have one product', () => {
			it('return correct total and products list', () => {
				const requestOrder = {
					products: [
						{
							name: 'kiwi',
							quantity: 2
						}
					]
				};
				const databaseProducts = [
					{
						name: 'kiwi',
						price: 1
					}
				];

				const payload = orderFactory.toDatabase(requestOrder, databaseProducts);

				expect(payload).to.be.eql({
					total: 2,
					products: [
						{
							name: 'kiwi',
							price: 1,
							quantity: 2
						}
					]
				});
			});
		});

		describe('when have three product', () => {
			it('return correct total and products list', () => {
				const requestOrder = {
					products: [
						{
							name: 'kiwi',
							quantity: 2
						},
						{
							name: 'abc',
							quantity: 2
						}
					]
				};
				const databaseProducts = [
					{
						name: 'kiwi',
						price: 1
					},
					{
						name: 'abc',
						price: 3
					}
				];

				const payload = orderFactory.toDatabase(requestOrder, databaseProducts);

				expect(payload).to.be.eql({
					total: 8,
					products: [
						{
							name: 'kiwi',
							price: 1,
							quantity: 2
						},
						{
							name: 'abc',
							price: 3,
							quantity: 2
						}
					]
				});
			});
		});
	});
});
