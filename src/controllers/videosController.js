class VideosController {
    constructor(bunnyApiService) {
        this.bunnyApiService = bunnyApiService;
    }

    async createVideo(req, res) {
        try {
            const { libraryId } = req.params;
            const videoData = req.body;
            const response = await this.bunnyApiService.createVideo(libraryId, videoData);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateVideo(req, res) {
        try {
            const { libraryId, id } = req.params;
            const videoData = req.body;
            const response = await this.bunnyApiService.updateVideo(libraryId, id, videoData);
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteVideo(req, res) {
        try {
            const { libraryId, id } = req.params;
            await this.bunnyApiService.deleteVideo(libraryId, id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
}

    async getVideos(req, res) {
        try {
            const { libraryId } = req.params;
            const { collectionId } = req.query;
            const response = await this.bunnyApiService.getVideos(libraryId, collectionId);
            let items = response.items;
            if (items) {
                items = items.map(item => {
                    item.url = `https://iframe.mediadelivery.net/play/${libraryId}/${item.guid}`;
                    return item;
                });
            };
            response.items = items;
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async uploadVideo(req, res) {
        try {
            const { libraryId, id } = req.params;
            const videoFile = req.file;
            const response = await this.bunnyApiService.uploadVideo(libraryId, id, videoFile);
            response.url = `https://iframe.mediadelivery.net/play/${libraryId}/${id}`;
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = VideosController;