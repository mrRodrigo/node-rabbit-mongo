const AsyncMiddleware = require('src/interfaces/middleware/AsyncMiddleware');

module.exports = (container) => ({
    post: AsyncMiddleware(async (scope) => {
		const { createOrderOperation, orderSerializer } = container;
       	const response = await createOrderOperation.execute(scope.body);
		const serialized = orderSerializer.serializeOrder(response);
        return scope.res.status(201).json(serialized);
    }),
	
	getById: AsyncMiddleware(async (scope) => {
		const { getOrderByIdOperation, orderSerializer } = container;
       	const response = await getOrderByIdOperation.execute(scope.params);
		const serialized = orderSerializer.serializeOrder(response);
        return scope.res.status(200).json(serialized);
    }),

	get: AsyncMiddleware(async (scope) => {
		const { getOrderOperation, orderSerializer } = container;
       	const response = await getOrderOperation.execute();
		const serialized = orderSerializer.serializeOrderList(response);
        return scope.res.status(200).json(serialized);
    })
});
