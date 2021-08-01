module.exports = ({ orderController, orderValidation }) => ([
    {
        path: '/',
        method: 'post',
		validation: {
			body: orderValidation.body
		},
        handler: orderController.post
    }
]);
