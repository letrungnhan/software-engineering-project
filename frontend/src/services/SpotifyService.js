import {protectedRequest, publicRequest} from "../utils/requestMethod";

class Spotify {
    async uploadTrack(track) {
        return new Promise((resolve, reject) => {
            protectedRequest().post("/songs", track).then(resolve).catch(reject)
        })
    }

    async getSongByArtistId(artistId) {
        return new Promise((resolve, reject) => {
            publicRequest().get(`/songs/artist/${artistId}`).then(resolve).catch(reject)
        })
    }

    async getArtist() {
        console.log("artist");
        return 'artist';
    }

    async getAllSongs() {
        return new Promise((resolve, reject) => {
            publicRequest().get("/songs").then(resolve).catch(reject)
        })
    }

    async getSongById(id) {
        return new Promise((resolve, reject) => {
            publicRequest().get(`/songs/${id}`).then(resolve).catch(reject)
        })
    }
}

const SpotifyService = new Spotify();
export default SpotifyService;