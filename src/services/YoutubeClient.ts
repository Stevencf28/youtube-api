import { google, youtube_v3 } from "googleapis";

export default class YoutubeClient {
	private readonly youtube: youtube_v3.Youtube;

	constructor(apiKey: string) {
		this.youtube = google.youtube({ version: "v3", auth: apiKey });
	}

	async searchVideos(
		query: string
	): Promise<youtube_v3.Schema$SearchListResponse | undefined> {
		const response = await this.youtube.search.list({
			part: ["id", "snippet"],
			q: query,
			type: ["video"],
			maxResults: 16,
		});
		return response.data;
	}

	async getSuggestedVideos(): Promise<
		youtube_v3.Schema$SearchListResponse | undefined
	> {
		const response = await this.youtube.search.list({
			part: ["id", "snippet"],
			type: ["video"],
			maxResults: 16,
			regionCode: "CA",
		});
		return response.data;
	}
}
