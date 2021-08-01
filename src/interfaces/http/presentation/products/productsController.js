const AsyncMiddleware = require('src/interfaces/middleware/AsyncMiddleware');

module.exports = (container) => ({
    get:  AsyncMiddleware(async (scope) => {
		const { getProductOperation, productSerializer } = container;
       	const response = await getProductOperation.execute(scope.params);
		const serialized = productSerializer.serializeProduct(response);
        return scope.res.status(200).json(serialized);
    })
});
