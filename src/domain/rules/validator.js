module.exports = ({
	validate: (params, ...validations) => {
		let validateParams = params;
	
		while (validations.length) {
			const response = validations.shift()(validateParams);
			validateParams = { ...validateParams, ...response };
	
			if (response.error || !response.hasNextValidation) break;
		}
	
		return validateParams;
	}
});
