const { expect } = require('chai');
const EnumRoutingKey = require('src/domain/enum/EnumRoutingKey');

describe('domain :: enum :: EnumRoutingKey ', () => {

	describe('#EnumRoutingKey', () => {
		it('returns enum with correct values and keys', () => {

			const keys = Object.keys(EnumRoutingKey);
			const values = Object.values(EnumRoutingKey);

			expect(keys).to.be.eql(['INCREMENT', 'DECREMENT']);
			expect(values).to.be.eql(['increment', 'decrement']);
		});
	});
});
