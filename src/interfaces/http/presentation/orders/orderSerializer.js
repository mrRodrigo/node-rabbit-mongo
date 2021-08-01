module.exports = () => ({
	serializeOrder: ({ _id, total, products }) => ({
		id: _id, total, products
	}),
	serializeOrderList: (data = []) => {
		return data.map(({ _id, total, products }) => ({
			id: _id, total, products
		}));
	}
 });
 