const { expect, spy } = require('chai');
const ProductService = require('src/app/services/ProductService');

describe('App :: handlers :: ProductService ', () => {
	describe('#incrementProduct', () => {
		describe('#incrementProduct successfully update', () => {
			let productRepository, productService;
			before(() => {
				productRepository = {
					update: spy(() => Promise.resolve('product'))
				};
				productService = ProductService({ productRepository })
			});
	
			it('call successfully', async () => {
				const { product, incrementError } = await productService.incrementProduct('name');
	
				expect(product).to.be.equal('product');
				expect(incrementError).to.be.undefined();
				expect(productRepository.update).to.have.been.called.once.with.exactly(
					{ name: 'name' },
					{ $inc: { quantity: 1 } }
				);
			});
		});
	
		describe('#incrementProduct error on update', () => {
			let productRepository, productService;
			before(() => {
				productRepository = {
					update: spy(() => Promise.resolve())
				};
				productService = ProductService({ productRepository })
			});
	
			it('call successfully', async () => {
				const { product, incrementError } = await productService.incrementProduct('name');
	
				expect(product).to.be.undefined('product');
				expect(incrementError.message).to.be.eql('It\'s not possible increment product');
				expect(productRepository.update).to.have.been.called.once.with.exactly(
					{ name: 'name' },
					{ $inc: { quantity: 1 } }
				);
			});
		})
	});

	describe('#decrementProduct', () => {
		describe('#decrementProduct successfully update', () => {
			let productRepository, productService;
			before(() => {
				productRepository = {
					update: spy(() => Promise.resolve('product'))
				};
				productService = ProductService({ productRepository })
			});
	
			it('call successfully', async () => {
				const { product, incrementError } = await productService.decrementProduct('name');
	
				expect(product).to.be.equal('product');
				expect(incrementError).to.be.undefined();
				expect(productRepository.update).to.have.been.called.once.with.exactly(
					{ name: 'name', quantity: { $gte: 1 }},
					{ $inc: { quantity: -1 } }
				);
			});
		});
	
		describe('#decrementProduct error on update', () => {
			let productRepository, productService;
			before(() => {
				productRepository = {
					update: spy(() => Promise.resolve())
				};
				productService = ProductService({ productRepository })
			});
	
			it('call successfully', async () => {
				const { product, decrementError } = await productService.decrementProduct('name');
	
				expect(product).to.be.undefined('product');
				expect(decrementError.message).to.be.eql('It\'s not possible decrement product');
				expect(productRepository.update).to.have.been.called.once.with.exactly(
					{ name: 'name', quantity: { $gte: 1 }},
					{ $inc: { quantity: -1 } }
				);
			});
		})
	});
})
