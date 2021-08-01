const { expect, spy } = require('chai');
const OrderController = require('src/interfaces/http/presentation/orders/orderController');

describe('Interfaces :: http :: OrderController ', () => {
	describe('#post', () => {
		let container, orderController, createResponse;
		before(() => {
			createResponse = { response: '...' }
			container = {
				orderSerializer: { serializeOrder: spy(() => ({})), serializeOrderList: spy(() => ({}))},
				createOrderOperation: { execute: spy(() => createResponse)},
				getOrderByIdOperation: { execute: spy(() => ({}))},
				getOrderOperation: { execute: spy(() => ({}))}
			};

			orderController = OrderController(container);
		});

		it('Returns correct controllers', async () => {
			const expectedData = { data: '...' };
			const scope = { 
				body: 'data',
				res: {
					status: spy(() => ({ json: () => expectedData }))
				} 
			};
			const response = await orderController.post(scope);

			expect(response).to.be.eql(expectedData);
			expect(container.createOrderOperation.execute).to.have.been.called.once.with.exactly(
				scope.body
			);
			expect(container.orderSerializer.serializeOrder).to.have.been.called.once.with.exactly(
				createResponse
			);
			expect(scope.res.status).to.have.been.called.once.with.exactly(201);
		});
	});

	describe('#getById', () => {
		let container, orderController, getResponse;
		before(() => {
			getResponse = { response: '...' }
			container = {
				orderSerializer: { serializeOrder: spy(() => ({})), serializeOrderList: spy(() => ({}))},
				getOrderByIdOperation: { execute: spy(() => getResponse)}
			};

			orderController = OrderController(container);
		});

		it('Returns correct controllers', async () => {
			const expectedData = { data: '...' };
			const scope = { 
				params: 'data',
				res: {
					status: spy(() => ({ json: () => expectedData }))
				} 
			};
			const response = await orderController.getById(scope);

			expect(response).to.be.eql(expectedData);
			expect(container.getOrderByIdOperation.execute).to.have.been.called.once.with.exactly(
				scope.params
			);
			expect(container.orderSerializer.serializeOrder).to.have.been.called.once.with.exactly(
				getResponse
			);
			expect(scope.res.status).to.have.been.called.once.with.exactly(200);
		});
	});

	describe('#get', () => {
		let container, orderController, getResponse;
		before(() => {
			getResponse = { response: '...' }
			container = {
				orderSerializer: { serializeOrderList: spy(() => ({}))},
				getOrderOperation: { execute: spy(() => getResponse)}
			};

			orderController = OrderController(container);
		});

		it('Returns correct controllers', async () => {
			const expectedData = { data: '...' };
			const scope = {
				res: { status: spy(() => ({ json: () => expectedData }))},
			};

			const response = await orderController.get(scope);

			expect(response).to.be.eql(expectedData);
			expect(container.getOrderOperation.execute).to.have.been.called.once.with.exactly();
			expect(container.orderSerializer.serializeOrderList).to.have.been.called.once.with.exactly(getResponse);
			expect(scope.res.status).to.have.been.called.once.with.exactly(200);
		});
	});
});
