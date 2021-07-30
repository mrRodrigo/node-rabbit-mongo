module.exports = ({ productRepository }) => ({
	execute: async (data) => {
		const name = data.toString();
		await productRepository.create({
			name,
			price: 0
		})
	}
})
