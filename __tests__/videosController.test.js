const VideosController = require('../src/controllers/videosController');
const BunnyApiService = require('../src/services/bunnyApiService');

jest.mock('../src/services/bunnyApiService');

describe('VideosController', () => {
    let videosController;
    let bunnyApiService;

    beforeEach(() => {
        bunnyApiService = new BunnyApiService();
        videosController = new VideosController(bunnyApiService);
    });

    test('should upload a video', async () => {
        const req = {
            params: { libraryId: 1 },
            file: { path: 'path/to/video.mp4', originalname: 'video.mp4' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const uploadResponse = { message: 'Video uploaded successfully' };
        bunnyApiService.uploadVideo.mockResolvedValue(uploadResponse);

        await videosController.uploadVideo(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(uploadResponse);
    });

    test('should get videos', async () => {
        const req = { params: { libraryId: 1 }, query: { collectionId: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const videos = [{ id: 1, name: 'Video 1' }];
        bunnyApiService.getVideos.mockResolvedValue(videos);

        await videosController.getVideos(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(videos);
    });

    test('should delete a video', async () => {
        const req = { params: { libraryId: 1, id: 1 } };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        bunnyApiService.deleteVideo.mockResolvedValue({ message: 'Video deleted successfully' });

        await videosController.deleteVideo(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toHaveBeenCalled();
    });
});