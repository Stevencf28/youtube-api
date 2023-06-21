import axios, { AxiosInstance } from "axios";

const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export type Video = {
	id: string;
	snippet: {
		publishedAt: string;
		title: string;
		thumbnails: {
			high: {
				url: string;
				height: number;
				width: number;
			};
		};
		description: string;
		channelTitle: string;
	};
	statistics: {
		viewCount: string;
		likeCount: string;
		dislikeCount: string;
	};
	player: {
		embedHtml: string;
	};
};

export type Category = {
	id: string;
	name: string;
	current: boolean;
};

type SearchResults = {
	items: Video[];
};

export default class YoutubeClient {
	private client: AxiosInstance;

	constructor() {
		this.client = axios.create({
			baseURL: "https://www.googleapis.com/youtube/v3/",
			params: {
				key: YOUTUBE_API_KEY,
			},
		});
	}

	public async getVideoCategories(): Promise<Category[]> {
		const response = await this.client.get("/videoCategories", {
			params: {
				part: "snippet",
				regionCode: "US",
				hl: "en_US",
			},
		});
		// these are non-working categories that Youtube API listed as assignable when they aren't.
		const excludedIds = ["19", "27", "29"];
		// api doesn't return with current, current is meant for determining if a category is currently active in the front-end
		const categories: Category[] = response.data.items
			.filter(
				(item: any) => item.snippet.assignable && !excludedIds.includes(item.id)
			) // Filter out items with assignable set to false or with excluded IDs
			.map((item: any) => ({
				id: item.id,
				name: item.snippet.title,
				current: false, // Set the current value to false for each category
			}));
		return categories;
	}

	public async getSuggestedVideos(): Promise<Video[]> {
		const response = await this.client.get("/videos", {
			params: {
				part: "snippet, statistics",
				chart: "mostPopular",
				maxResults: 31,
			},
		});
		const videos: Video[] = response.data.items;
		return videos;
	}

	public async getSuggestedVideosByCategory(
		categoryId: string
	): Promise<Video[]> {
		const response = await this.client.get("/videos", {
			params: {
				part: "snippet, statistics",
				chart: "mostPopular",
				videoCategoryId: categoryId,
				maxResults: 31,
			},
		});
		const videos: Video[] = response.data.items;
		return videos;
	}

	public async getSuggestedRelatedVideos(categoryId: string): Promise<Video[]> {
		const response = await this.client.get("/videos", {
			params: {
				part: "snippet, statistics",
				chart: "mostPopular",
				videoCategoryId: categoryId,
				maxResults: 31,
			},
		});
		const videos: Video[] = response.data.items;
		return videos;
	}

	public async getVideo(videoId: string): Promise<Video> {
		const response = await this.client.get("/videos", {
			params: {
				id: videoId,
				part: "snippet, statistics, player",
				maxResults: 1,
			},
		});

		const video: Video = response.data.items[0];
		return video;
	}

	public async searchVideos(query: string): Promise<Video[]> {
		const response = await this.client.get("/search", {
			params: {
				part: "snippet",
				maxResults: 31,
				q: query,
				type: "video",
			},
		});
		const results: SearchResults = response.data.items;
		const videos: Video[] = results.items;
		return videos;
	}
}
