const { expect, spy } = require('chai');
const GetProductOperation = require('src/app/operations/getProductOperation');

describe('app :: operations :: GetProductOperation ', () => {
	describe('#GetProductOperation', () => { 
		describe('#GetProductOperation is successfully called', () => {
			let getProductOperation, productRepository, databaseProduct;
	
			before(() => {
				databaseProduct = { data: '...' };
				productRepository = {
					get: spy(() => databaseProduct)
				};
				getProductOperation = GetProductOperation({ productRepository });
			});
	
			it('returns enum with correct values and keys', async () => {
	
				const response = await getProductOperation.execute({ name: '123' });
	
				expect(response).to.be.eql(databaseProduct);
				expect(productRepository.get).to.have.been.called.once.with.exactly({ name: '123' });
			});
		});

		describe('#GetProductOperation is not successfully called', () => {
			let getProductOperation, productRepository;
	
			before(() => {
				productRepository = {
					get: spy(() => null)
				};
				getProductOperation = GetProductOperation({ productRepository });
			});
	
			it('Throws an error', async () => {
				try {
					await getProductOperation.execute({ name: '123' });
				} catch (error) {
					expect(error.message).to.be.eql('Product not Found');
					expect(productRepository.get).to.have.been.called.once.with.exactly({ name: '123' });
				}
			});
		});
	});
	
});
