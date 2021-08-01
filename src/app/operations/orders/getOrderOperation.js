module.exports = ({ orderRepository }) => ({
	execute: async () => {
		const response = await orderRepository.get();
		return response;
	}
})
