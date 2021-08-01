const mongoose = require('mongoose');

class DatabaseProvider {
	constructor({ environment }){
		this.mongoURL = environment.db.url;
		this.connectionConfig = environment.db.connectionConfig;
		this.retryConnectionDelay = environment.db.retryConnectionDelay;
		this.mongoose = mongoose;
		this.connection = null;
	}

	retryToConnect = (err) => {
		this.connection = null;

		if (err) console.error('[Database]', err.message);

		console.log('[Database] Connection error retrying');

		return setTimeout(this.connect, this.retryConnectionDelay);
	};

	connect = async () => {
		if(this.connection) return this.connection;

		try {
			this.connection = await this.mongoose.createConnection(
				this.mongoURL, 
				this.connectionConfig
			);

			console.log('[Database] Connected');

			this.connection.on('error', this.retryToConnect);
			this.connection.on('disconnected', this.retryToConnect);
		} catch (error) {
			console.log('[Database] Error on startup');
			throw error;
		}
	}
}

module.exports = DatabaseProvider;
