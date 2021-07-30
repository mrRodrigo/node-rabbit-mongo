const { Schema } = require('mongoose');

module.exports = ({ databaseProvider }) => {
	const connection = databaseProvider.connection;

	const ProductSchema = new Schema({
		name: { 
			type: String,
			required: true
		}, 
		price: { 
			type: Number,
			required: true
		},
		quantity: { 
			type: Number,
			default: 0
		}
	});

	return connection.model('products', ProductSchema);
};
