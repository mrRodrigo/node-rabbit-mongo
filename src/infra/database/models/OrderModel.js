const { Schema } = require('mongoose');

module.exports = ({ databaseProvider }) => {
	const connection = databaseProvider.connection;

	const OrderSchema = new Schema({
		id: { 
			type: Number,
			unique: true
		}, 
		products: [],
		total: { 
			type: Number,
			required: true
		}
	});

	return connection.model('orders', OrderSchema);
};
