import { YoutubeClient } from "./YoutubeClient";

export type Video = {
	id: string;
	title: string;
	description: string;
	thumbnailUrl: string;
	publishedAt: string;
};

export class Youtube {
	private client: YoutubeClient;

	constructor(client: YoutubeClient) {
		this.client = client;
	}

	async searchVideos(query: string): Promise<Video[]> {
		const response = await this.client.get("/search", {
			params: {
				q: query,
				type: "video",
				part: "id,snippet",
				maxResults: 10,
			},
		});

		const videos = response.items.map((item: any) => ({
			id: item.id.videoId,
			title: item.snippet.title,
			description: item.snippet.description,
			thumbnailUrl: item.snippet.thumbnails.medium.url,
			publishedAt: item.snippet.publishedAt,
		}));

		return videos;
	}
}
