import { Fragment, useEffect, useState } from "react";
import { useYoutubeClient } from "../context/YoutubeContext";
import { Video, videoCategories } from "../services/YoutubeClient";
import { Link } from "react-router-dom";
import numeral from "numeral";
import { formatDistanceToNow } from "date-fns";
import { Disclosure, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Home() {
	const youtubeClient = useYoutubeClient();
	const [videos, setVideos] = useState<Video[]>([]);
	const [loading, setLoading] = useState(true);
	const getSuggestedVideos = async () => {
		console.log("called getSuggestedVideos");
		try {
			setLoading(true);
			const videos = await youtubeClient.getSuggestedVideos();
			setVideos([]);
			setVideos(videos);
			setLoading(false);
			window.scrollTo({ top: 0, behavior: "smooth" });
		} catch (error) {
			console.error(error);
		}
	};

	const getSuggestedVideosByCategory = async (categoryId: string) => {
		console.log("called getVideoByCategory");
		try {
			setLoading(true);
			const videos = await youtubeClient.getSuggestedVideosByCategory(
				categoryId
			);
			setVideos([]);
			setVideos(videos);
			setLoading(false);
			window.scrollTo({ top: 0, behavior: "smooth" });
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		// useEffect runs only once
		document.title = "SCTube";
		getSuggestedVideos();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div>
				<Popover as='div' className='sticky menu-top xl:hidden'>
					{({ open }) => (
						<>
							{/* Mobile menu button*/}
							<Popover.Button className='inline-flex items-center justify-around w-full p-3 btn'>
								{open ? (
									<XMarkIcon className=' h-6 w-6' aria-hidden='true' />
								) : (
									<Bars3Icon className=' h-6 w-6' aria-hidden='true' />
								)}
							</Popover.Button>
							<Transition
								as={Fragment}
								enter='transition ease-out duration-200'
								enterFrom='opacity-0 translate-y-1'
								enterTo='opacity-100 translate-y-0'
								leave='transition ease-in duration-150'
								leaveFrom='opacity-100 translate-y-0'
								leaveTo='opacity-0 translate-y-1'
							>
								<Popover.Panel className='absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl rounded-md bg-light-background '>
									<div className='relative flex flex-col rounded-lg h-64 overflow-y-auto overscroll-contain no-scrollbar'>
										{videoCategories.map((category) => (
											<Popover.Button
												className={`${
													category.current
														? "bg-white text-black border-b border-black p-4 whitespace-nowrap "
														: " btn border-b border-black p-4 whitespace-nowrap"
												}`}
												key={category.id}
												aria-current={category.current ? "page" : undefined}
												onClick={() => {
													if (category.current) {
														category.current = false;
														getSuggestedVideos();
													} else {
														Object.values(videoCategories).forEach(
															(c) => (c.current = false)
														); // Set all categories to current: false
														category.current = true; // Set the clicked category to current: true
														getSuggestedVideosByCategory(category.id);
													}
												}}
											>
												{category.name}
											</Popover.Button>
										))}
									</div>
								</Popover.Panel>
							</Transition>
						</>
					)}
				</Popover>
				<div className='flex 2xl:flex-row grow 2xl:flex-wrap 2xl:justify-center w-full max-w-screen-7xl '>
					<Disclosure
						as='div'
						className='bg-light-background hidden xl:flex xl:flex-col h-full fixed top-menu left-0 overflow-auto'
					>
						{videoCategories.map((category) => (
							<Disclosure.Button
								className={`${
									category.current
										? "bg-white text-black border-b border-black p-4 whitespace-nowrap "
										: " btn border-b border-black p-4 whitespace-nowrap"
								}`}
								key={category.id}
								aria-current={category.current ? "page" : undefined}
								onClick={() => {
									if (category.current) {
										category.current = false;
										getSuggestedVideos();
									} else {
										Object.values(videoCategories).forEach(
											(c) => (c.current = false)
										); // Set all categories to current: false
										category.current = true; // Set the clicked category to current: true
										getSuggestedVideosByCategory(category.id);
									}
								}}
							>
								{category.name}
							</Disclosure.Button>
						))}
					</Disclosure>
					<div className='flex grow max-w-7xl py-6 sm:px-6 2xl:px-8 '>
						{loading ? (
							<>
								<p>Loading...</p>
							</>
						) : videos.length > 0 ? (
							<>
								<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-4 p-4 static '>
									{videos.slice(1).map((video) => (
										<Link
											to={`/watch/${video.id}`}
											className='overflow-hidden grow'
											key={video.id}
										>
											<img
												className='w-full object-fill rounded-lg'
												src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
												alt={video.snippet.title}
											/>
											<div className='flex flex-col justify-start'>
												<h2 className='text-3xl sm:text-2xl font-medium line-clamp-2'>
													{video.snippet.title}
												</h2>
												<p className='text-lg font-medium truncate'>
													{video.snippet.channelTitle}
												</p>
												<div className='flex flex-row flex-wrap justify-items-start text-base font-medium'>
													<p>
														{numeral(video.statistics.viewCount).format("0.0a")}{" "}
														Views
													</p>
													<p className='mx-1'>•</p>
													<p>
														{formatDistanceToNow(
															new Date(video.snippet.publishedAt),
															{
																addSuffix: true,
															}
														)}
													</p>
												</div>
											</div>
										</Link>
									))}
								</div>
							</>
						) : (
							<p>No videos found</p>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
