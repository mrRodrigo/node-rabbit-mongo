const { Router } = require('express');
class RouterRegister {

    constructor({ validatorMiddleware }) {
      this.validator = validatorMiddleware;
    }

    register(routes){
      const router = Router();

      routes.forEach(route => {
        const validateContract = [];

        const { method, path, validation, handler } = route;

		if(validation)
        	validateContract.push(this.validator.validateContract(validation));

        router[method](path, validateContract, handler);
      });

      return router;
    }
}

module.exports = RouterRegister;
