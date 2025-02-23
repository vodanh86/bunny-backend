class LibrariesController {
    constructor(bunnyApiService) {
        this.bunnyApiService = bunnyApiService;
    }

    async createLibrary(req, res) {
        try {
            const libraryData = req.body;
            const newLibrary = await this.bunnyApiService.createLibrary(libraryData);
            res.status(201).json(newLibrary);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateLibrary(req, res) {
        try {
            const { id } = req.params;
            const libraryData = req.body;
            const updatedLibrary = await this.bunnyApiService.updateLibrary(id, libraryData);
            res.status(200).json(updatedLibrary);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteLibrary(req, res) {
        try {
            const { id } = req.params;
            await this.bunnyApiService.deleteLibrary(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getLibraries(req, res) {
        try {
            const libraries = await this.bunnyApiService.getLibraries();
            res.status(200).json(libraries);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getLibraryById(req, res) {
        try {
            const { id } = req.params;
            const library = await this.bunnyApiService.getLibraryById(id);
            if (library) {
                res.status(200).json(library);
            } else {
                res.status(404).json({ message: 'Library not found' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = LibrariesController;