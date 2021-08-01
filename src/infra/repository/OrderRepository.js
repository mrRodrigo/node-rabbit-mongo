const Repository = require('src/infra/repository/Repository');

class OrderRepository extends Repository {
    constructor({ orderModel }) {
        super({ resourceModel: orderModel });
    }

	async get(id) {
		let databaseResource;

		if(id) databaseResource = await this.resourceModel.findById(id).exec();
		else databaseResource = await this.resourceModel.find().exec()

        if (!databaseResource) return null;

        return databaseResource;
    }

}

module.exports = OrderRepository;
