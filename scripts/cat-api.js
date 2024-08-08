export default class CatApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = "https://api.thecatapi.com";
    }

    async getRandomCatImgUrl() {
        try {
            const response = await axios.get(`${this.baseUrl}/v1/images/search?api_key=${this.apiKey}`);
            return response.data?.[0].url;
        }
        catch (e) {
            console.log("No cats captured!");
        }
    }
}