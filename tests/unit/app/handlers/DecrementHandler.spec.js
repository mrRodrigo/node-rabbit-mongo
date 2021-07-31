const { expect, spy } = require('chai');
const DecrementHandler = require('src/app/handlers/DecrementHandler');

describe('App :: handlers :: DecrementHandler ', () => {
	describe('Call productService successfully', () => {
		let decrementHandler, productService;

		beforeEach(() => {
			productService = {
				decrementProduct: spy(() => Promise.resolve({ product: 'data' }))
			};

			spy.on(global.console, 'info');
			spy.on(global.console, 'error');

			decrementHandler = DecrementHandler({ productService });
		});

		afterEach(() => {
			spy.restore();
		})
		
		it('Returns updated product', async () => {
			const product = await decrementHandler.execute('"amqp data"');

			expect(product).to.be.eql('data');
			expect(productService.decrementProduct).to.have.been.called.once.with.exactly('amqp data');
			expect(console.info).to.have.been.called.once.with.exactly(`[AMQP] Received message: decrement amqp data`);
			expect(console.error).to.not.have.been.called(`[AMQP] Received message: decrement amqp data`);
		});
	});

	describe('Call productService with error', () => {
		let decrementHandler, productService, decrementError;

		beforeEach(() => {
			decrementError = new Error('Not Found');

			productService = {
				decrementProduct: spy(() => Promise.resolve({ decrementError }))
			};

			spy.on(global.console, 'info');
			spy.on(global.console, 'error');

			decrementHandler = DecrementHandler({ productService });
		});

		afterEach(() => {
			spy.restore();
		})
		
		it('Returns updated product', async () => {
			const product = await decrementHandler.execute('"amqp data"');

			expect(product).to.be.undefined();
			expect(decrementError).to.be.eql(decrementError);
			expect(productService.decrementProduct).to.have.been.called.once.with.exactly('amqp data');
			expect(console.info).to.have.been.called.once.with.exactly(`[AMQP] Received message: decrement amqp data`);
			expect(console.error).to.have.been.called.once.with.exactly('Not Found');
		});
	});
});
