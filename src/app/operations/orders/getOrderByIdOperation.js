const NotFoundException = require('src/infra/exceptions/NotFoundException');

module.exports = ({ orderRepository }) => ({
	execute: async (params) => {
		const { id } = params;
		const response = await orderRepository.get(id)
		if(!response) throw new NotFoundException('Order not Found');
		return response;
	}
})
