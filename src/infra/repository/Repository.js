class Repository {
    constructor({ ResourceModel }) {
        this.ResourceModel = ResourceModel;
    }

    async count(query = {}) {
        return await this.ResourceModel.countDocuments(query);
    }

    async get(query) {
        const databaseResource = await this.ResourceModel.findOne(query);

        if (!databaseResource) return null;

        return databaseResource;
    }

    async create(entity) {
        const resourceModel = await this.ResourceModel.create(entity);
        return resourceModel;
    }

    async update(query, entity, opts) {
        const options = Object.assign(
            {},
            { new: true, upsert: false, runValidators: true },
            opts
        );
        const databaseUpdatedResource = await this.ResourceModel.findOneAndUpdate(
            query,
            entity,
            options
        );
        if (!databaseUpdatedResource) return null;

        return databaseUpdatedResource;
    }

    async replace(query, entity) {
        const databaseReplacedResource = await this.ResourceModel.findOneAndReplace(
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
        const databaseDeletedResource = await this.ResourceModel.findOneAndRemove(
            query
        );
        return databaseDeletedResource;
    }
}

module.exports = Repository;
