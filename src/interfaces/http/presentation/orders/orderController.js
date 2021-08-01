const AsyncMiddleware = require('src/interfaces/middleware/AsyncMiddleware');

module.exports = (container) => ({
    post:  AsyncMiddleware(async (scope) => {
		const { createOrderOperation, orderSerializer } = container;
       	const response = await createOrderOperation.execute(scope.body);
		const serialized = orderSerializer.serializeOrder(response);
        return scope.res.status(201).json(serialized);
    })
});
