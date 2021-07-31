const Repository = require('src/infra/repository/Repository');

class ProductRepository extends Repository {
    constructor({ productModel }) {
        super({ resourceModel: productModel });
    }
}

module.exports = ProductRepository;
