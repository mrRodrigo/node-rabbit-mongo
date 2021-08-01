const { Router } = require('express');

module.exports = ({ routerRegister, productRoutes }) => {
	const apiRouter = Router();

	apiRouter.use('/products', ...routerRegister(productRoutes));

	return apiRouter;
};
