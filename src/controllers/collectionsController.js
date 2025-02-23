class CollectionsController {
    constructor(bunnyApiService) {
        this.bunnyApiService = bunnyApiService;
    }

    async createCollection(req, res) {
        try {
            const { libraryId } = req.params;
            const collectionData = req.body;
            const response = await this.bunnyApiService.createCollection(libraryId, collectionData);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateCollection(req, res) {
        try {
            const { libraryId, id } = req.params;
            const collectionData = req.body;
            const response = await this.bunnyApiService.updateCollection(libraryId, id, collectionData);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteCollection(req, res) {
        try {
            const { libraryId, id } = req.params;
            await this.bunnyApiService.deleteCollection(libraryId, id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getCollections(req, res) {
        try {
            const { libraryId } = req.params;
            const collections = await this.bunnyApiService.getCollections(libraryId);
            res.status(200).json(collections);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getCollectionById(req, res) {
        try {
            const { libraryId, id } = req.params;
            const collection = await this.bunnyApiService.getCollectionById(libraryId, id);
            if (collection) {
                res.status(200).json(collection);
            } else {
                res.status(404).json({ message: 'Collection not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = CollectionsController;