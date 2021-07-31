const { expect, spy } = require('chai');
const express = require('express');
const routerRegister = require('src/interfaces/http/routerRegister');

describe('Interfaces :: Http :: routerRegister ', () => {

	describe('#routerRegister', () => {
		let server, environment, context, router;

		before(() => {
			register = routerRegister({ environment, context, router });
		});

		describe('when routerRegister is called', () => {
			it('returns router with routes', () => {
				const router = register([
					{
						path: '/',
						method: 'get',
						handler: (req, res) => res.send('ok')
					}
				]);

				const [ get ] = router[0].stack;
				expect(get.route.path).to.be.eql('/');
				expect(get.route.methods).to.be.eql({ get: true });
			});
		});
	});
});
