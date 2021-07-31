const { expect } = require('chai');
const { fromAMQP } = require('src/domain/utils/ExtractProductName');

describe('domain :: utils :: ExtractProductName ', () => {

	describe('#fromAMQP', () => {
		it('returns content without ""', () => {
			const content = '"AMQP DATA"';
			const parsed = fromAMQP(content);
			expect(parsed).to.be.eql('AMQP DATA');
		});

		it('returns content without **', () => {
			const content = '*AMQP DATA*';
			const parsed = fromAMQP(content);
			expect(parsed).to.be.eql('AMQP DATA');
		});
	});
});
