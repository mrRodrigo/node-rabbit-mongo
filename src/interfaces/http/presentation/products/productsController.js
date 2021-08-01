const AsyncMiddleware = require('src/interfaces/middleware/AsyncMiddleware');

module.exports = (container) => ({
    get:  AsyncMiddleware(async (scope) => {
		const { getProductOperation } = container
       	const response = await getProductOperation.execute(scope.params);
        return scope.res.status(200).json(response);
    })
});
