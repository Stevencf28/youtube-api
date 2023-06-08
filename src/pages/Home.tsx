import { useEffect, useState } from "react";
import { useYoutubeClient } from "../context/YoutubeContext";
import { Video } from "../services/YoutubeClient";

export default function Home() {
	const youtubeClient = useYoutubeClient();
	const [videos, setVideos] = useState<Video[]>([]);

	useEffect(() => {
		document.title = "SCTube";

		const getSuggestedVideos = async () => {
			try {
				const videos = await youtubeClient.getSuggestedVideos();
				setVideos(videos);
			} catch (error) {
				console.error(error);
			}
		};
		getSuggestedVideos();
	});

	return (
		<>
			<div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
				<div className='max-w-3xl mx-auto'>
					{Array.isArray(videos) && videos.length > 0 && (
						<>
							<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
								{videos.slice(1).map((video) => (
									<div
										key={video.id}
										className='border border-gray-200 rounded-lg overflow-hidden'
									>
										<a
											href={`https://www.youtube.com/watch?v=${video.id}`}
											target='_blank'
											rel='noopener noreferrer'
										>
											<img
												src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
												alt={video.snippet.title}
											/>
											<h2 className='text-lg font-medium text-gray-900'>
												{video.snippet.title}
											</h2>
											<p className='text-sm text-gray-500'>
												{video.snippet.description}
											</p>
										</a>
									</div>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</>
	);
}
