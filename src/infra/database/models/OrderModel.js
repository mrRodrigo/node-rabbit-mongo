const { Schema } = require('mongoose');

module.exports = ({ databaseProvider }) => {
	const connection = databaseProvider.connection;

	const OrderSchema = new Schema({
		products: {
			type: Array,
			default : []
		},
		total: { 
			type: Number,
			required: true
		}
	});

	return connection.model('orders', OrderSchema);
};
