const asyncMiddleware = require('src/interfaces/middleware/AsyncMiddleware');

module.exports = ({ context }) => ({
	['increment']: asyncMiddleware(async ctx => context.cradle.addProductOperation.execute(ctx.content)),
	['decrement']: (data) => console.log(data.content.toString(), 'decremented')
});
