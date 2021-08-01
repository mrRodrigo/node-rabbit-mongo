const Repository = require('src/infra/repository/Repository');

class ProductRepository extends Repository {
	constructor({ productModel }) {
		super({ resourceModel: productModel });
	}

	async getByName(name) {
		const ignoreCaseQuery = { name: { $regex: name, $options: 'i' } };
		const databaseResource = await this.resourceModel.findOne(ignoreCaseQuery);

		if (!databaseResource) return null;

		return databaseResource;
	}

	async getListByName(products) {

		const productsName = products.map(({ name }) => name);

		const query = { name: { $in: productsName } };

		const databaseResource = await this.resourceModel.find(query);

		if (!databaseResource) return [];
		return databaseResource;
	}

	updateProductsQuantity(products) {
		return new Promise((resolve, reject) => {
			const bulk = products.map(({ name, quantity }) => (
				{ 
					updateOne: { 
						filter: { name, quantity: { $gte: 1 } },
						update: {
							$inc: { quantity: -Number(quantity) } 
						}
					}         
				} 
			));
			 
			this.resourceModel.bulkWrite(bulk, (err, r) => {
				if(err) reject(err);
				resolve(r)
			});
		})
		
	}
}

module.exports = ProductRepository;
