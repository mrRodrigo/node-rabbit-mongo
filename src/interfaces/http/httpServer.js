const cors = require('cors');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const chalk = require('chalk');
const { scopePerRequest } = require('awilix-express');

module.exports = ({ environment, context, router }) => {
	const app = express();

	app.use(
		cors({
			origin: ['*'],
			methods: ['GET', 'POST', 'PUT', 'DELETE'],
			allowedHeaders: ['Content-Type', 'Authorization']
		})
	);

	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(compression());
	app.disable('x-powered-by');
	app.use(scopePerRequest(context));
	app.use(router);

	// app.get('*', (req, res, next) => {
	//   next(appErrors.notFound());
	// });

	app.use((error, req, res, next) => {
		next(error);
	});

	//app.use(errorMiddleware.use());

	return {
		app,
		start: () =>
			new Promise((resolve, reject) => {
				const server = http.createServer(app);

				server.listen(environment.httpServer.port);

				server.on('error', (err) => {
					reject(err);
				});

				server.on('listening', () => {
					console.log(
						`[HTTP] Listening on: ${environment.httpServer.host}:${environment.httpServer.port}`
					);
					resolve({ server });
				});
			})
	};
};
