const { expect, spy } = require('chai');
const AmqpClient = require('src/interfaces/amqp/AmqpClient');

describe('Interfaces :: amqp :: AmqpClient ', () => {
	before(() => {
		spy.on(global.console, 'log', () => ({}))
		spy.on(global.console, 'error', () => ({}))
	});

	after(() => {
		spy.restore();
	})
	describe('call connect successfully', () => {
		let amqpClient, environment, amqpController, amqpLib;

		before(() => {
			environment = {
				amqpConfig: {
					host: 'hosturl',
					sub: {
						exchanges: []
					},
					retryConnectionDelay: 'test'
				}
			};
			amqpController = {};

			const connection = {
				on: spy(() => {})
			};
			amqpLib = {
				connect: spy((_, fn) => {
					fn(undefined, connection);
				})
			};

			amqpClient = new AmqpClient({ environment, amqpController, amqpLib });
		});

		describe('when client instance is created', () => {
			it('have all params', () => {
				expect(amqpClient.hostURL).to.be.eql(environment.amqpConfig.host);
				expect(amqpClient.exchanges).to.be.eql(
					environment.amqpConfig.sub.exchanges
				);
				expect(amqpClient.retryConnectionDelay).to.be.eql(
					environment.amqpConfig.retryConnectionDelay
				);
				expect(amqpClient.amqpController).to.be.eql(amqpController);
				expect(amqpClient.amqpLib).to.be.eql(amqpLib);
				expect(amqpClient.connection).to.be.eql(null);
			});
		});

		describe('when client is connected', () => {
			it('call connect from amqplib', async () => {
				
				expect(amqpClient.hostURL).to.be.eql(environment.amqpConfig.host);
				expect(amqpClient.exchanges).to.be.eql(
					environment.amqpConfig.sub.exchanges
				);
				expect(amqpClient.retryConnectionDelay).to.be.eql(
					environment.amqpConfig.retryConnectionDelay
				);
				expect(amqpClient.amqpController).to.be.eql(amqpController);
				expect(amqpClient.amqpLib).to.be.eql(amqpLib);

				const connection = await amqpClient.connect();

				expect(connection.on).to.have.been.called.with('error');
				expect(connection.on).to.have.been.called.with('close');
				expect(amqpLib.connect).to.have.been.called.with('hosturl');
			});
		});
	});

	describe('call connect is not successfully', () => {
		let amqpClient, environment, amqpController, amqpLib, error;

		before(() => {
			environment = {
				amqpConfig: {
					host: 'hosturl',
					sub: {
						exchanges: []
					},
					retryConnectionDelay: 'test'
				}
			};
			amqpController = {};

			error = 'error';

			amqpLib = {
				connect: spy((_, fn) => {
					fn(error);
				})
			};

			amqpClient = new AmqpClient({ environment, amqpController, amqpLib });
			spy.on(amqpClient, 'retryToConnect');
		});

		it('call retryToConnect from amqpClient', async () => {
			expect(amqpClient.hostURL).to.be.eql(environment.amqpConfig.host);
			expect(amqpClient.exchanges).to.be.eql(
				environment.amqpConfig.sub.exchanges
			);
			expect(amqpClient.retryConnectionDelay).to.be.eql(
				environment.amqpConfig.retryConnectionDelay
			);
			expect(amqpClient.amqpController).to.be.eql(amqpController);
			expect(amqpClient.amqpLib).to.be.eql(amqpLib);

			await amqpClient.connect();

			expect(amqpClient.retryToConnect).to.have.been.called.with(error);
		});
	});

	describe('call start is called', () => {
		let amqpClient, environment, amqpController, amqpLib;

		describe('when client instance does not have connection', () => {
			before(() => {
				environment = {
					amqpConfig: {
						host: 'hosturl',
						sub: {
							exchanges: []
						},
						retryConnectionDelay: 'test'
					}
				};
				amqpController = {};

				const connection = {
					on: spy(() => {})
				};
				amqpLib = {
					connect: spy((_, fn) => {
						fn(undefined, connection);
					})
				};

				amqpClient = new AmqpClient({ environment, amqpController, amqpLib });

				spy.on(amqpClient, 'connect', () => Promise.resolve({ data: '...' }));
			});

			it('call connect', async () => {
				expect(amqpClient.hostURL).to.be.eql(environment.amqpConfig.host);
				expect(amqpClient.exchanges).to.be.eql(
					environment.amqpConfig.sub.exchanges
				);
				expect(amqpClient.retryConnectionDelay).to.be.eql(
					environment.amqpConfig.retryConnectionDelay
				);
				expect(amqpClient.amqpController).to.be.eql(amqpController);
				expect(amqpClient.amqpLib).to.be.eql(amqpLib);
				expect(amqpClient.connection).to.be.eql(null);

				await amqpClient.start();
				expect(amqpClient.connection).to.be.eql({ data: '...' });
				expect(amqpClient.connect).to.be.have.been.called();
			});
		});

		describe('when client instance have connection', () => {
			before(() => {
				environment = {
					amqpConfig: {
						host: 'hosturl',
						sub: {
							exchanges: []
						},
						retryConnectionDelay: 'test'
					}
				};
				amqpController = {};

				const connection = {
					on: spy(() => {})
				};
				amqpLib = {
					connect: spy((_, fn) => {
						fn(undefined, connection);
					})
				};

				amqpClient = new AmqpClient({ environment, amqpController, amqpLib });

				spy.on(amqpClient, 'connect', () => Promise.resolve({ data: '...' }));
			});

			it('call connect', async () => {
				expect(amqpClient.hostURL).to.be.eql(environment.amqpConfig.host);
				expect(amqpClient.exchanges).to.be.eql(
					environment.amqpConfig.sub.exchanges
				);
				expect(amqpClient.retryConnectionDelay).to.be.eql(
					environment.amqpConfig.retryConnectionDelay
				);
				expect(amqpClient.amqpController).to.be.eql(amqpController);
				expect(amqpClient.amqpLib).to.be.eql(amqpLib);
				expect(amqpClient.connection).to.be.eql(null);

				amqpClient.connection = { data: '' };
				await amqpClient.start();

				expect(amqpClient.connection).to.be.eql({ data: '' });
				expect(amqpClient.connect).to.not.be.have.been.called();
			});
		});
	});

	describe('call retryToConnect is called', () => {
		let amqpClient, environment, amqpController, amqpLib;

		describe('when client instance does not have connection', () => {
			before(() => {
				environment = {
					amqpConfig: {
						host: 'hosturl',
						sub: {
							exchanges: []
						},
						retryConnectionDelay: 1
					}
				};
				amqpController = {};
				amqpLib = {};

				amqpClient = new AmqpClient({ environment, amqpController, amqpLib });

				spy.on(amqpClient, 'connect', () => Promise.resolve({ data: '...' }));
			});

			it('call connect', (done) => {
				expect(amqpClient.hostURL).to.be.eql(environment.amqpConfig.host);
				expect(amqpClient.exchanges).to.be.eql(
					environment.amqpConfig.sub.exchanges
				);
				expect(amqpClient.retryConnectionDelay).to.be.eql(
					environment.amqpConfig.retryConnectionDelay
				);
				expect(amqpClient.amqpController).to.be.eql(amqpController);
				expect(amqpClient.amqpLib).to.be.eql(amqpLib);
				expect(amqpClient.connection).to.be.eql(null);

				const { _onTimeout } = amqpClient.retryToConnect();

				_onTimeout().then(() => {
					expect(amqpClient.connect).to.be.have.been.called();
					done();
				});
			});
		});
	});
});
