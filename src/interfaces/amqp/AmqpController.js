const EnumRoutingKey = require('src/domain/enum/EnumRoutingKey');
const AsyncMiddleware = require('src/interfaces/middleware/AsyncMiddleware');

module.exports = ({ context }) => ({
	[EnumRoutingKey.INCREMENT]: AsyncMiddleware(async ctx =>
		await context.cradle.incrementHandler.execute(ctx.content)
	),
	[EnumRoutingKey.DECREMENT]: AsyncMiddleware(async ctx =>
		await context.cradle.decrementHandler.execute(ctx.content)
	)
});
