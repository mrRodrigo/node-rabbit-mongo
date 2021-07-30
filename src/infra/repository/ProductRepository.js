const Repository = require('src/infra/repository/Repository');

class ProductRepository extends Repository {
    constructor({ productModel }) {
        super({ ResourceModel: productModel });
    }
}

module.exports = ProductRepository;
