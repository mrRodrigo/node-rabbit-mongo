const { expect, spy } = require('chai');
const Repository = require('src/infra/repository/Repository');

describe('Infra :: Database :: Repository :: Repository', () => {
    describe('#get', () => {
        context('when data exists', () => {
            let repository, mockSchema;
            before(() => {
                mockSchema = {
                    findOne: spy(() => ({ data_id: 'test' }))
                };

                repository = new Repository({
                    resourceModel: mockSchema
                });
            });

            it('returns data', async () => {
                const response = await repository.get({ data_id: 'test' });

                expect(response).to.be.exist();
                expect(mockSchema.findOne).to.have.been.called.with({ data_id: 'test' });
            });
        });

		context('when data exists does not exists', () => {
            let repository, mockSchema;
            before(() => {
                mockSchema = {
                    findOne: spy(() => {})
                };

                repository = new Repository({
                    resourceModel: mockSchema
                });
            });

            it('returns data', async () => {
                const response = await repository.get({ data_id: 'test' });

                expect(response).to.be.null();
                expect(mockSchema.findOne).to.have.been.called.with({ data_id: 'test' });
            });
        });
    });

	describe('#create', () => {
        context('when is created', () => {
            let repository, mockSchema;
            before(() => {
                mockSchema = {
                    create: spy(() => ({ data_id: 'test' }))
                };

                repository = new Repository({
                    resourceModel: mockSchema
                });
            });

            it('returns data', async () => {
                const response = await repository.create({ data_id: 'test' });

                expect(response).to.be.exist();
                expect(mockSchema.create).to.have.been.called.with({ data_id: 'test' });
            });
        });
    });

	describe('#update', () => {
        context('when is updated', () => {
            let repository, mockSchema;
            before(() => {
                mockSchema = {
                    findOneAndUpdate: spy(() => ({ data_id: 'test' }))
                };

                repository = new Repository({
                    resourceModel: mockSchema
                });
            });

            it('returns data', async () => {
                const response = await repository.update({ data_id: 'test' });

                expect(response).to.be.exist();
                expect(mockSchema.findOneAndUpdate).to.have.been.called.with({ data_id: 'test' });
            });
        });
    });

	describe('#replace', () => {
        context('when is replaced', () => {
            let repository, mockSchema;
            before(() => {
                mockSchema = {
                    findOneAndReplace: spy(() => ({ data_id: 'test' }))
                };

                repository = new Repository({
                    resourceModel: mockSchema
                });
            });

            it('returns data', async () => {
                const response = await repository.replace({ data_id: 'test' });

                expect(response).to.be.exist();
                expect(mockSchema.findOneAndReplace).to.have.been.called.with({ data_id: 'test' });
            });
        });
    });
});
