const { Router } = require('express');

module.exports = ({ routerRegister, productRoutes, orderRoutes }) => {
	const apiRouter = Router();
	
	apiRouter.use('/products', routerRegister.register(productRoutes));
	apiRouter.use('/orders', routerRegister.register(orderRoutes));

	return apiRouter;
};
