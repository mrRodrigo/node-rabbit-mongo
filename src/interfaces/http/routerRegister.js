const { Router } = require('express');

const register = (routes) => {
	const allRoutes = routes.map((route) => {
		return Router()[route.method](route.path, route.handler);
	});

	return allRoutes;
};

module.exports = () => register;
