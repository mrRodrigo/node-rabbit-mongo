const { expect, spy} = require('chai');
const express = require('express');
const httpServer = require('src/interfaces/http/httpServer');

describe('Interfaces :: Http :: httpServer ', () => {

	describe('#httpServer', () => {
		let server, environment, context, router;

		before(() => {
			environment = {}; 
			context = {}; 
			router = express.Router();
			server = httpServer({ environment, context, router });
		});

		describe('when Server is created', () => {
			it('server has all params', async () => {
				const { app, start } = server;
				expect(start).to.be.instanceOf(Function);
			});
		});
	});
});
