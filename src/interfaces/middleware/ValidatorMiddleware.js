const BadRequestException = require('src/infra/exceptions/BadRequestException');

module.exports = () => ({
	validateContract: (validation) => (req, res, next) => {
	  try {
  
		const schemaOptions = { abortEarly: false, convert: true, allowUnknown: false, stripUnknown: true };
  
		Object.keys(validation).forEach(validationKey => {
		  const { error, value } = validation[validationKey].validate(req[validationKey], schemaOptions);
  
		  if (error){
			throw Object.assign(new BadRequestException('Bad Request'), { details: error.details })
		  }
  
		  req[validationKey] = value;
  
		});
		next();
  
	  } catch (error) {
		next(error, req, res, next);
	  }
	}
  });
