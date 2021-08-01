const { expect, spy } = require('chai');
const CreateOrderOperation = require('src/app/operations/orders/createOrderOperation');

describe('app :: operations :: CreateOrderOperation ', () => {
	describe('#CreateOrderOperation', () => {
		describe('#CreateOrderOperation is successfully called', () => {
			let createOrderOperation,
				productRepository,
				orderRepository,
				databaseProduct,
				orderRules,
				orderFactory,
				factoryPayload;

			before(() => {
				factoryPayload = { data: '123' };
				orderFactory = {
					toDatabase: spy(() => factoryPayload)
				};
				orderRules = {
					validateFoundProducts: spy(() => ({
						isValid: true,
						hasNextValidation: true
					})),
					validateQuantity: spy(() => ({
						isValid: true,
						hasNextValidation: true
					}))
				};
				databaseProduct = { data: '...' };
				orderRepository = {
					create: spy(() => databaseProduct)
				};
				productRepository = {
					getListByName: spy(() => databaseProduct),
					updateProductsQuantity: spy(() => databaseProduct)
				};
				createOrderOperation = CreateOrderOperation({
					productRepository,
					orderRepository,
					orderRules,
					orderFactory
				});
			});

			it('returns enum with correct values and keys', async () => {
				const requestOrder = { products: [] };
				const response = await createOrderOperation.execute(requestOrder);

				expect(response).to.be.eql(databaseProduct);
				expect(orderFactory.toDatabase).to.have.been.called.once.with.exactly(
					requestOrder,
					databaseProduct
				);
				expect(productRepository.getListByName).to.have.been.called.once.with.exactly(
					requestOrder.products
				);
				expect(productRepository.updateProductsQuantity).to.have.been.called.once.with.exactly(
					requestOrder.products
				);
				expect(orderRepository.create).to.have.been.called.once.with.exactly(
					factoryPayload
				);
				expect(orderRules.validateFoundProducts).to.have.been.called.once.with.exactly({
					requestOrder, databaseProducts: databaseProduct
				});
				expect(orderRules.validateQuantity).to.have.been.called.once.with.exactly({
					requestOrder,
					databaseProducts: databaseProduct,
					isValid: true,
					hasNextValidation: true
				});
			});
		});

		describe('#CreateOrderOperation with error on validate', () => {
			let createOrderOperation,
				productRepository,
				orderRepository,
				databaseProduct,
				orderRules,
				orderFactory,
				factoryPayload;

			before(() => {
				factoryPayload = { data: '123' };
				orderFactory = {
					toDatabase: spy(() => factoryPayload)
				};
				orderRules = {
					validateFoundProducts: spy(() => ({
						isValid: false,
						hasNextValidation: true
					})),
					validateQuantity: spy(() => ({
						isValid: false,
						hasNextValidation: false,
						error: new Error('validation error')
					}))
				};
				databaseProduct = { data: '...' };
				orderRepository = {
					create: spy(() => databaseProduct)
				};
				productRepository = {
					getListByName: spy(() => databaseProduct),
					updateProductsQuantity: spy(() => databaseProduct)
				};
				createOrderOperation = CreateOrderOperation({
					productRepository,
					orderRepository,
					orderRules,
					orderFactory
				});
			});

			it('returns enum with correct values and keys', async () => {
				const requestOrder = { products: [] };
				
				try {
					await createOrderOperation.execute(requestOrder);
				} catch (error) {
					expect(error.message).to.be.eql('validation error');
					expect(productRepository.getListByName).to.have.been.called.once.with.exactly(
						requestOrder.products
					);
					expect(orderFactory.toDatabase).to.not.have.been.called();
			
					expect(productRepository.updateProductsQuantity).to.not.have.been.called();
					expect(orderRepository.create).to.not.have.been.called();
				}
			});
		});

		describe('#CreateOrderOperation with database error', () => {
			let createOrderOperation,
				productRepository,
				orderRepository,
				databaseProduct,
				orderRules,
				orderFactory,
				factoryPayload;

			before(() => {
				factoryPayload = { data: '123' };
				orderFactory = {
					toDatabase: spy(() => factoryPayload)
				};
				orderRules = {
					validateFoundProducts: spy(() => ({})),
					validateQuantity: spy(() => ({}))
				};
				databaseProduct = { data: '...' };
				orderRepository = {
					create: spy(() => databaseProduct)
				};
				productRepository = {
					getListByName: spy(() => { throw new Error('database error')}),
					updateProductsQuantity: spy(() => databaseProduct)
				};
				createOrderOperation = CreateOrderOperation({
					productRepository,
					orderRepository,
					orderRules,
					orderFactory
				});
			});

			it('returns enum with correct values and keys', async () => {
				const requestOrder = { products: [] };
				
				try {
					await createOrderOperation.execute(requestOrder);
				} catch (error) {
					expect(error.message).to.be.eql('database error');
					expect(productRepository.getListByName).to.have.been.called.once.with.exactly(requestOrder.products);
					expect(orderFactory.toDatabase).to.not.have.been.called();
					expect(productRepository.updateProductsQuantity).to.not.have.been.called();
					expect(orderRepository.create).to.not.have.been.called();
				}
			});
		});
	});
});
