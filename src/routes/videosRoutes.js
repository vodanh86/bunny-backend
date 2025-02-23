const express = require('express');
const VideosController = require('../controllers/videosController');
const BunnyApiService = require('../services/bunnyApiService');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

const router = express.Router({ mergeParams: true });
const videosController = new VideosController(new BunnyApiService());

router.post('/', videosController.createVideo.bind(videosController));
router.get('/', videosController.getVideos.bind(videosController));
router.put('/:id', videosController.updateVideo.bind(videosController));
router.delete('/:id', videosController.deleteVideo.bind(videosController));
router.post('/:id/upload', uploadMiddleware, videosController.uploadVideo.bind(videosController));

module.exports = router;