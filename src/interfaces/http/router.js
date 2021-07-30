const { Router } = require('express');

module.exports = ({ routerRegister, userRoutes }) => {
	const apiRouter = Router();

	apiRouter.use('/users', ...routerRegister(userRoutes));

	return apiRouter;
};
