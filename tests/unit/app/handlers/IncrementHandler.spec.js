const { expect, spy } = require('chai');
const IncrementHandler = require('src/app/handlers/IncrementHandler');

describe('App :: handlers :: IncrementHandler ', () => {
	describe('Call productService successfully', () => {
		let incrementHandler, productService;

		beforeEach(() => {
			productService = {
				incrementProduct: spy(() => Promise.resolve({ product: 'data' }))
			};

			spy.on(global.console, 'info');
			spy.on(global.console, 'error');

			incrementHandler = IncrementHandler({ productService });
		});

		afterEach(() => {
			spy.restore();
		})
		
		it('Returns updated product', async () => {
			const product = await incrementHandler.execute('"amqp data"');

			expect(product).to.be.eql('data');
			expect(productService.incrementProduct).to.have.been.called.once.with.exactly('amqp data');
			expect(console.info).to.have.been.called.once.with.exactly(`[AMQP] Received message: increment amqp data`);
			expect(console.error).to.not.have.been.called(`[AMQP] Received message: increment amqp data`);
		});
	});

	describe('Call productService with error', () => {
		let incrementHandler, productService, incrementError;

		beforeEach(() => {
			incrementError = new Error('Not Found');

			productService = {
				incrementProduct: spy(() => Promise.resolve({ incrementError }))
			};

			spy.on(global.console, 'info');
			spy.on(global.console, 'error');

			incrementHandler = IncrementHandler({ productService });
		});

		afterEach(() => {
			spy.restore();
		})
		
		it('Returns updated product', async () => {
			const product = await incrementHandler.execute('"amqp data"');

			expect(product).to.be.undefined();
			expect(incrementError).to.be.eql(incrementError);
			expect(productService.incrementProduct).to.have.been.called.once.with.exactly('amqp data');
			expect(console.info).to.have.been.called.once.with.exactly(`[AMQP] Received message: increment amqp data`);
			expect(console.error).to.have.been.called.once.with.exactly('Not Found');
		});
	});
});
