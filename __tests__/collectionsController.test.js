const CollectionsController = require('../src/controllers/collectionsController');
const BunnyApiService = require('../src/services/bunnyApiService');

jest.mock('../src/services/bunnyApiService');

describe('CollectionsController', () => {
    let collectionsController;
    let bunnyApiService;

    beforeEach(() => {
        bunnyApiService = new BunnyApiService();
        collectionsController = new CollectionsController(bunnyApiService);
    });

    test('should create a collection', async () => {
        const req = { params: { libraryId: 1 }, body: { name: 'New Collection' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const newCollection = { id: 1, name: 'New Collection' };
        bunnyApiService.createCollection.mockResolvedValue(newCollection);

        await collectionsController.createCollection(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(newCollection);
    });

    test('should get collections', async () => {
        const req = { params: { libraryId: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const collections = [{ id: 1, name: 'Collection 1' }];
        bunnyApiService.getCollections.mockResolvedValue(collections);

        await collectionsController.getCollections(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(collections);
    });

    test('should get collection by ID', async () => {
        const req = { params: { libraryId: 1, id: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const collection = { id: 1, name: 'Collection 1' };
        bunnyApiService.getCollectionById.mockResolvedValue(collection);

        await collectionsController.getCollectionById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(collection);
    });

    test('should update a collection', async () => {
        const req = { params: { libraryId: 1, id: 1 }, body: { name: 'Updated Collection' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const updatedCollection = { id: 1, name: 'Updated Collection' };
        bunnyApiService.updateCollection.mockResolvedValue(updatedCollection);

        await collectionsController.updateCollection(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(updatedCollection);
    });

    test('should delete a collection', async () => {
        const req = { params: { libraryId: 1, id: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        bunnyApiService.deleteCollection.mockResolvedValue({ message: 'Collection deleted successfully' });

        await collectionsController.deleteCollection(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
    });
});