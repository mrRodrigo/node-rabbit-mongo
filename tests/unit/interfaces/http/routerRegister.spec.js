const { expect } = require('chai');
const RouterRegister = require('src/interfaces/http/routerRegister');

describe('Interfaces :: Http :: routerRegister ', () => {

	describe('#routerRegister', () => {
		let environment, validatorMiddleware, router, routerRegister;

		before(() => {
			validatorMiddleware = { validateContract: () => { }};
			routerRegister = new RouterRegister({ environment, validatorMiddleware, router });
		});

		describe('when routerRegister is called', () => {
			it('returns router with routes', () => {
				const router = routerRegister.register([
					{
						path: '/',
						method: 'get',
						handler: (req, res) => res.send('ok')
					}
				]);

				const [ get ] = router.stack;
				expect(get.route.path).to.be.eql('/');
				expect(get.route.methods).to.be.eql({ get: true });
			});
		});
	});
});
