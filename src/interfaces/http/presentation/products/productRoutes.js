module.exports = ({ productsController }) => ([
    {
        path: '/:name',
        method: 'get',
        handler: productsController.get
    }
]);
