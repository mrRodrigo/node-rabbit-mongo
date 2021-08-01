const Joi = require('joi');

const body = Joi.object({
	products: Joi.array()
		.items(
			Joi.object({
				name: Joi.string().required(),
				quantity: Joi.number().options({ convert: true }).required()
			}).required()
		)
		.required()
});

module.exports = () => ({
	body
});
