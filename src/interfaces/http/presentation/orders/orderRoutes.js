module.exports = ({ orderController, orderValidation }) => ([
    {
        path: '/',
        method: 'post',
		validation: {
			body: orderValidation.body
		},
        handler: orderController.post
    },
	{
        path: '/',
        method: 'get',
        handler: orderController.get
    },
	{
        path: '/:id',
        method: 'get',
        handler: orderController.getById
    }
]);
