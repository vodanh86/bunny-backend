require('dotenv').config(); // Nạp biến môi trường từ .env vào process.env
const axios = require('axios');

class BunnyApiService {
    constructor() {
        this.apiKey = process.env.API_KEY; // Replace with the actual Bunny.net API key
        this.baseUrl = process.env.BASE_URL; // Replace with the actual Bunny.net API base URL
        this.videoUrl = process.env.VIDEO_URL; // Replace with the actual Bunny.net video URL
        this.libraryApiKeysCache = {}; // In-memory cache for library API keys
    }

    async getLibraries() {
        const response = await axios.get(`${this.baseUrl}/videolibrary`, {
            headers: {
                'AccessKey': this.apiKey,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }

    async getLibraryById(libraryId) {
        const response = await axios.get(`${this.baseUrl}/videolibrary/${libraryId}`, {
            headers: {
                'AccessKey': this.apiKey,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }

    async createLibrary(libraryData) {
        const response = await axios.post(`${this.baseUrl}/videolibrary`, libraryData, {
            headers: {
                'AccessKey': this.apiKey,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }

    async updateLibrary(libraryId, libraryData) {
        const response = await axios.post(`${this.baseUrl}/videolibrary/${libraryId}`, libraryData, {
            headers: {
                'AccessKey': this.apiKey,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }

    async deleteLibrary(libraryId) {
        const response = await axios.delete(`${this.baseUrl}/videolibrary/${libraryId}`, {
            headers: {
                'AccessKey': this.apiKey,
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return { message: 'Library deleted successfully' };
        }
        return response.data;
    }

    async getLibraryApiKeys(libraryId) {
        // Check if the API key is already cached
        if (this.libraryApiKeysCache[libraryId]) {
            return this.libraryApiKeysCache[libraryId];
        }

        // If not cached, fetch the API key and cache it
        const library = await this.getLibraryById(libraryId);
        const apiKey = library.ApiKey;
        this.libraryApiKeysCache[libraryId] = apiKey;
        return apiKey;
    }

    async getCollections(libraryId) {
        const apiKey = await this.getLibraryApiKeys(libraryId);
        const response = await axios.get(`${this.videoUrl}/library/${libraryId}/collections`, {
            headers: {
                'AccessKey': apiKey,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }

    async createCollection(libraryId, collectionData) {
        const apiKey = await this.getLibraryApiKeys(libraryId);
        const response = await axios.post(`${this.videoUrl}/library/${libraryId}/collections`, collectionData, {
            headers: {
                'AccessKey': apiKey,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }

    async getCollectionById(libraryId, collectionId) {
        const apiKey = await this.getLibraryApiKeys(libraryId);
        const response = await axios.get(`${this.videoUrl}/library/${libraryId}/collections/${collectionId}`, {
            headers: {
                'AccessKey': apiKey,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }

    async updateCollection(libraryId, collectionId, collectionData) {
        const apiKey = await this.getLibraryApiKeys(libraryId);
        const response = await axios.post(`${this.videoUrl}/library/${libraryId}/collections/${collectionId}`, collectionData, {
            headers: {
                'AccessKey': apiKey,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }

    async deleteCollection(libraryId, collectionId) {
        const apiKey = await this.getLibraryApiKeys(libraryId);
        const response = await axios.delete(`${this.videoUrl}/library/${libraryId}/collections/${collectionId}`, {
            headers: {
                'AccessKey': apiKey,
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return { message: 'Collection deleted successfully' };
        }
        return response.data;
    }

    async getVideos(libraryId, collectionId) {
        const apiKey = await this.getLibraryApiKeys(libraryId);
        const url = collectionId ? `?collection=${collectionId}` : "";
        const response = await axios.get(`${this.videoUrl}/library/${libraryId}/videos${url}`, {
            headers: {
                'AccessKey': apiKey,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }

    async createVideo(libraryId, videoData) {
        const apiKey = await this.getLibraryApiKeys(libraryId);
        const response = await axios.post(`${this.videoUrl}/library/${libraryId}/videos`, videoData, {
            headers: {
                'AccessKey': apiKey,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }

    async updateVideo(libraryId, videoId, videoData) {
        const apiKey = await this.getLibraryApiKeys(libraryId);
        const response = await axios.post(`${this.videoUrl}/library/${libraryId}/videos/${videoId}`, videoData, {
            headers: {
                'AccessKey': apiKey,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }

    async deleteVideo(libraryId, videoId) {
        const apiKey = await this.getLibraryApiKeys(libraryId);
        const response = await axios.delete(`${this.videoUrl}/library/${libraryId}/videos/${videoId}`, {
            headers: {
                'AccessKey': apiKey,
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return { message: 'Video deleted successfully' };
        }
        return response.data;
    }

    async uploadVideo(libraryId, videoId, videoFile) {
        const apiKey = await this.getLibraryApiKeys(libraryId);

        const response = await axios.put(
            `${this.videoUrl}/library/${libraryId}/videos/${videoId}`,
            videoFile.buffer,
            {
              headers: {
                'AccessKey': `${apiKey}`,
                'Content-Type': 'application/json'
              },
            }
          );
        return response.data;
    }
}

module.exports = BunnyApiService;