const express = require('express');
const LibrariesController = require('../controllers/librariesController');
const collectionsRoutes = require('../routes/collectionsRoutes');
const videosRoutes = require('../routes/videosRoutes');

const router = express.Router();
const BunnyApiService = require('../services/bunnyApiService');
const librariesController = new LibrariesController(new BunnyApiService());

router.post('/', librariesController.createLibrary.bind(librariesController));
router.get('/', librariesController.getLibraries.bind(librariesController));
router.get('/:id', librariesController.getLibraryById.bind(librariesController));
router.put('/:id', librariesController.updateLibrary.bind(librariesController));
router.delete('/:id', librariesController.deleteLibrary.bind(librariesController));

// Nested collections routes
router.use('/:libraryId/collections', collectionsRoutes);

// Nested videos routes
router.use('/:libraryId/videos', videosRoutes);

module.exports = router;