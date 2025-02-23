const LibrariesController = require('../src/controllers/librariesController');
const BunnyApiService = require('../src/services/bunnyApiService');

jest.mock('../src/services/bunnyApiService');

describe('LibrariesController', () => {
    let librariesController;
    let bunnyApiService;

    beforeEach(() => {
        bunnyApiService = new BunnyApiService();
        librariesController = new LibrariesController(bunnyApiService);
    });

    test('should create a library', async () => {
        const req = { body: { name: 'New Library' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const newLibrary = { id: 1, name: 'New Library' };
        bunnyApiService.createLibrary.mockResolvedValue(newLibrary);

        await librariesController.createLibrary(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(newLibrary);
    });

    test('should get libraries', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const libraries = [{ id: 1, name: 'Library 1' }];
        bunnyApiService.getLibraries.mockResolvedValue(libraries);

        await librariesController.getLibraries(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(libraries);
    });

    test('should get library by ID', async () => {
        const req = { params: { id: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const library = { id: 1, name: 'Library 1' };
        bunnyApiService.getLibraryById.mockResolvedValue(library);

        await librariesController.getLibraryById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(library);
    });

    test('should update a library', async () => {
        const req = { params: { id: 1 }, body: { name: 'Updated Library' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const updatedLibrary = { id: 1, name: 'Updated Library' };
        bunnyApiService.updateLibrary.mockResolvedValue(updatedLibrary);

        await librariesController.updateLibrary(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(updatedLibrary);
    });

    test('should delete a library', async () => {
        const req = { params: { id: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        bunnyApiService.deleteLibrary.mockResolvedValue({ message: 'Library deleted successfully' });

        await librariesController.deleteLibrary(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
    });
});