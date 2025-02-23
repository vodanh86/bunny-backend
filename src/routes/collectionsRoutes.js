const express = require('express');
const CollectionsController = require('../controllers/collectionsController');
const BunnyApiService = require('../services/bunnyApiService');

const router = express.Router({ mergeParams: true });
const collectionsController = new CollectionsController(new BunnyApiService());

router.post('/', collectionsController.createCollection.bind(collectionsController));
router.get('/', collectionsController.getCollections.bind(collectionsController));
router.get('/:id', collectionsController.getCollectionById.bind(collectionsController));
router.put('/:id', collectionsController.updateCollection.bind(collectionsController));
router.delete('/:id', collectionsController.deleteCollection.bind(collectionsController));

module.exports = router;