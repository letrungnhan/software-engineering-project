import {protectedRequest} from "../utils/requestMethod";

class SpotifyService {
    async uploadTrack(track) {
        return new Promise((resolve, reject) => {
            protectedRequest().post("/songs", track).then(resolve).catch(reject)
        })
    }

    async getArtist() {
        console.log("artist");
        return 'artist';
    }

    async getAllSongs() {
        return new Promise((resolve, reject) => {
            protectedRequest().get("/songs").then(resolve).catch(reject)
        })
    }

    async getSongById(id) {
        return new Promise((resolve, reject) => {
            protectedRequest().get(`/songs/${id}`).then(resolve).catch(reject)
        })
    }
}

export default SpotifyService;