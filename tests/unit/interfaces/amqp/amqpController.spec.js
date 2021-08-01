const { expect, spy } = require('chai');
const EnumRoutingKey = require('src/domain/enum/EnumRoutingKey');
const AmqpController = require('src/interfaces/amqp/AmqpController');

describe('Interfaces :: amqp :: AmqpController ', () => {
	describe('Have all routing keys and call successfully', () => {
		let context, amqpController;
		before(() => {
			context = {
				cradle: {
					incrementHandler: {
						execute: spy(() => Promise.resolve({}))
					},
					decrementHandler: {
						execute: spy(() => Promise.resolve({}))
					}
				}
			};

			
			amqpController = AmqpController({ context });
		});

		it('Returns correct function INCREMENT routing key', () => {
			const ctx = { content: 'amqpdata' };

			amqpController[EnumRoutingKey.INCREMENT](ctx);

			expect(
				context.cradle.incrementHandler.execute
			).to.have.been.called.once.with.exactly(ctx.content);
		});

		it('Returns correct function DECREMENT routing key', () => {
			const ctx = { content: 'amqpdata' };

			amqpController[EnumRoutingKey.DECREMENT](ctx);

			expect(
				context.cradle.decrementHandler.execute
			).to.have.been.called.once.with.exactly(ctx.content);
		});
	});
});
