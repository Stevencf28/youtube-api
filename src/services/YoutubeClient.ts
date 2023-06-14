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

export const videoCategories = [
	{ id: "1", name: "Film & Animation", current: false },
	{ id: "2", name: "Autos & Vehicles", current: false },
	{ id: "10", name: "Music", current: false },
	{ id: "15", name: "Pets & Animals", current: false },
	{ id: "17", name: "Sports", current: false },
	{ id: "20", name: "Gaming", current: false },
	{ id: "22", name: "People & Blogs", current: false },
	{ id: "23", name: "Comedy", current: false },
	{ id: "24", name: "Entertainment", current: false },
	{ id: "25", name: "News & Politics", current: false },
	{ id: "26", name: "Howto & Style", current: false },
	{ id: "28", name: "Science & Technology", current: false },
];

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

	public async getSuggestedVideos(): Promise<Video[]> {
		const response = await this.client.get("/videos", {
			params: {
				part: "snippet, statistics",
				chart: "mostPopular",
				maxResults: 32,
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
				maxResults: 32,
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
				maxResults: 32,
				q: query,
				type: "video",
			},
		});
		const results: SearchResults = response.data.items;
		const videos: Video[] = results.items;
		return videos;
	}
}
