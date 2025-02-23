const BunnyApiService = require('../src/services/bunnyApiService');
const axios = require('axios');
jest.mock('axios');

describe('BunnyApiService', () => {
    let bunnyApiService;

    beforeEach(() => {
        bunnyApiService = new BunnyApiService();
    });

    test('should fetch libraries', async () => {
        const libraries = [{ id: 1, name: 'Library 1' }];
        axios.get.mockResolvedValue({ data: libraries });

        const result = await bunnyApiService.getLibraries();
        expect(result).toEqual(libraries);
    });

    test('should fetch library by ID', async () => {
        const library = { id: 1, name: 'Library 1' };
        axios.get.mockResolvedValue({ data: library });

        const result = await bunnyApiService.getLibraryById(1);
        expect(result).toEqual(library);
    });

    // Add more tests for other methods
});