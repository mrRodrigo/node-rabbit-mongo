class Application {  
	constructor ({ httpServer, amqpClient, databaseProvider }) {
	  this.httpServer = httpServer;
	  this.amqpClient = amqpClient;
	  this.databaseProvider = databaseProvider;
	}
  
	async start() {
	  await this.databaseProvider.connect();
	  await this.httpServer.start();
	  await this.amqpClient.start();
	}
  }

  module.exports = Application;
