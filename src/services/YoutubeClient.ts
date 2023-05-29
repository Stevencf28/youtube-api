import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://www.googleapis.com/youtube/v3";

export class YoutubeClient {
	private http: AxiosInstance;

	constructor() {
		this.http = axios.create({
			baseURL: BASE_URL,
		});
	}

	async get(path: string, config: any): Promise<any> {
		const response = await this.http.get(path, config);
		return response.data;
	}
}
