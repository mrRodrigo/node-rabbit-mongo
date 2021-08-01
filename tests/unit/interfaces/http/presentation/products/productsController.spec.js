const { expect, spy } = require('chai');
const ProductsController = require('src/interfaces/http/presentation/products/productsController');

describe('Interfaces :: http :: ProductsController ', () => {
	describe('#get', () => {
		let container, productController, getResponse;
		before(() => {
			getResponse = { response: '...' }
			container = {
				productSerializer: { serializeProduct: spy(() => ({})) },
				getProductOperation: { execute: spy(() => getResponse)}
			};

			productController = ProductsController(container);
		});

		it('Returns correct controllers', async () => {
			const expectedData = { data: '...' };
			const scope = { 
				params: 'data',
				res: {
					status: spy(() => ({ json: () => expectedData }))
				} 
			};
			const response = await productController.get(scope);

			expect(response).to.be.eql(expectedData);
			expect(container.getProductOperation.execute).to.have.been.called.once.with.exactly(
				scope.params
			);
			expect(container.productSerializer.serializeProduct).to.have.been.called.once.with.exactly(
				getResponse
			);
			expect(scope.res.status).to.have.been.called.once.with.exactly(200);
		});
	});
});
