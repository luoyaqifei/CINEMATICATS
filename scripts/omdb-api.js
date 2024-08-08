export default class OmdbAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = "http://www.omdbapi.com";
    }

    async getMovieById(id) {
        try {
            const response = await axios.get(`${this.baseUrl}/?apiKey=${this.apiKey}&i=${id}`);
            return response.data;
        }
        catch(e) {
            console.log("Fetching movie by id " + id + " failed!");
        }
    }
}