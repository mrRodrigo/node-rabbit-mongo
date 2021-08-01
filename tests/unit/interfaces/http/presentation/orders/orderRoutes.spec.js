const { expect, spy } = require('chai');
const OrderRoutes = require('src/interfaces/http/presentation/orders/orderRoutes');

describe('Interfaces :: http :: OrderRoutes ', () => {
	describe('#get', () => {
		let orderController, orderValidation, routes;
		before(() => {
			orderController = {
				get: { execute: spy(() => {})},
				post: { execute: spy(() => {})},
				getById: { execute: spy(() => {})}
			};

			orderValidation = {
				body: () => {}
			};

			routes = OrderRoutes({ orderController, orderValidation});
		});

		it('Returns correct path', () => {
			expect(routes[0].path).to.be.eql('/');
			expect(routes[0].method).to.be.eql('post');
			expect(routes[0].validation).to.haveOwnProperty('body');

			expect(routes[1].path).to.be.eql('/');
			expect(routes[1].method).to.be.eql('get');

			expect(routes[2].path).to.be.eql('/:id');
			expect(routes[2].method).to.be.eql('get');
		});
	});
});
