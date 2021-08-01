const Repository = require('src/infra/repository/Repository');

class OrderRepository extends Repository {
    constructor({ orderModel }) {
        super({ resourceModel: orderModel });
    }
}

module.exports = OrderRepository;
