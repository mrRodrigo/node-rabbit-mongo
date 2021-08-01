const {
	createContainer,
	asValue,
	asFunction,
	asClass,
	Lifetime
} = require('awilix');

const app = require('src/app');
const httpServer = require('src/interfaces/http/httpServer');
const router = require('src/interfaces/http/router');
const routerRegister = require('src/interfaces/http/routerRegister');
const amqp = require('amqplib/callback_api');
const environment = require('../environments');

const container = createContainer();

container
	.register({
		app: asClass(app).singleton(),
		httpServer: asFunction(httpServer).singleton(),
		context: asValue(container),
		environment: asValue(environment),
		router: asFunction(router).singleton(),
		routerRegister: asFunction(routerRegister),
		amqpLib: asValue(amqp)
	})
	.loadModules(
		[
			'src/app/**/*.js',
			'src/domain/services/**/*.js',
			'src/interfaces/http/presentation/**/*.js',
			'src/interfaces/middleware/**/*.js',
			'src/interfaces/amqp/**/*.js',
			'src/infra/repository/**/*.js',
			[
				'src/infra/database/models/*.js',
				{
					lifetime: Lifetime.SINGLETON
				}
			],
			[
				'src/infra/database/databaseProvider.js',
				{
					lifetime: Lifetime.SINGLETON
				}
			],
			[
				'src/interfaces/amqp/AmqpClient.js',
				{
					lifetime: Lifetime.SINGLETON
				}
			]
		
		],
		{
			formatName: 'camelCase',
			resolverOptions: {
				lifetime: Lifetime.SCOPED
			}
		}
	);

module.exports = container;
