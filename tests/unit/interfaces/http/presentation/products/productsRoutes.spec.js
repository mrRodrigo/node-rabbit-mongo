const { expect, spy } = require('chai');
const ProductsRoutes = require('src/interfaces/http/presentation/products/productRoutes');

describe('Interfaces :: http :: ProductsRoutes ', () => {
	describe('#get', () => {
		let productsController, routes;
		before(() => {
			productsController = {
				get: { execute: spy(() => {})}
			};

			routes = ProductsRoutes({ productsController });
		});

		it('Returns correct path', () => {
			expect(routes[0].path).to.be.eql('/:name');
			expect(routes[0].method).to.be.eql('get');
		});
	});
});
