class AmqpClient {
	constructor({ environment, amqpController, amqpLib }) {
		this.hostURL = environment.amqpConfig.host;
		this.exchanges = environment.amqpConfig.sub.exchanges;
		this.retryConnectionDelay = environment.amqpConfig.retryConnectionDelay;
		this.amqpController = amqpController;
		this.amqpLib = amqpLib;
		this.connection = null;
	}

	retryToConnect(err){
		this.connection = null;
		if (err) console.error('[AMQP]', err.message);
		console.error('[AMQP] reconnecting');
		return setTimeout(this.connect, this.retryConnectionDelay);
	};

	connect() {
		return new Promise((resolve, reject) =>
			this.amqpLib.connect(this.hostURL, async (err, connection) => {
				if (err) this.retryToConnect(err);

				if (connection) {
					connection.on('error', this.retryToConnect);

					connection.on('close', this.retryToConnect);

					console.log('[AMQP] Connected on:', this.hostURL);

					this.exchanges.forEach(async (exchange, index, exchanges) => {
						const { name, queue, routingKey, event } = exchange;
			
						const ch = await connection.createChannel();
						ch.assertExchange(name);
			
						ch.assertQueue(queue, { exclusive: true }, (err, q) => {
							ch.bindQueue(q.queue, name, routingKey);
							ch.consume(q.queue, this.amqpController[event]);
						});

						if(index === exchanges.length -1) resolve();
					});
					resolve(connection);
				}
			})
		);
	};

	async start() {
		if (!this.connection) this.connection = await this.connect();
	};
}

module.exports = AmqpClient;
