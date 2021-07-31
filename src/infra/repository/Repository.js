class Repository {
    constructor({ resourceModel }) {
        this.resourceModel = resourceModel;
    }

    async count(query = {}) {
        return await this.resourceModel.countDocuments(query);
    }

    async get(query) {
        const databaseResource = await this.resourceModel.findOne(query);

        if (!databaseResource) return null;

        return databaseResource;
    }

    async create(entity) {
        const resourceModel = await this.resourceModel.create(entity);
        return resourceModel;
    }

    async update(query, entity, opts) {
        const options = Object.assign(
            {},
            { new: true, upsert: false, runValidators: true },
            opts
        );
        const databaseUpdatedResource = await this.resourceModel.findOneAndUpdate(
            query,
            entity,
            options
        );
        if (!databaseUpdatedResource) return null;

        return databaseUpdatedResource;
    }

    async replace(query, entity) {
        const databaseReplacedResource = await this.resourceModel.findOneAndReplace(
            query,
            entity,
            {
                new: true,
                returnOriginal: false,
                runValidators: true,
            }
        );
        return databaseReplacedResource;
    }

    async remove(query) {
        const databaseDeletedResource = await this.resourceModel.findOneAndRemove(
            query
        );
        return databaseDeletedResource;
    }
}

module.exports = Repository;
