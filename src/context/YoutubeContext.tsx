import React, { createContext, useContext, useState, useEffect } from "react";
import YoutubeClient from "../services/YoutubeClient";

const YoutubeContext = createContext<YoutubeClient | undefined>(undefined);

interface YoutubeContextProviderProps {
	apiKey: string;
	children: React.ReactNode;
}

export function YoutubeContextProvider({
	apiKey,
	children,
}: YoutubeContextProviderProps): JSX.Element {
	const [youtubeClient, setYoutubeClient] = useState<YoutubeClient>();

	useEffect(() => {
		const client = new YoutubeClient(apiKey);
		setYoutubeClient(client);
	}, [apiKey]);

	return (
		<YoutubeContext.Provider value={youtubeClient}>
			{children}
		</YoutubeContext.Provider>
	);
}

export function useYoutubeClient(): YoutubeClient {
	const youtubeClient = useContext(YoutubeContext);
	if (!youtubeClient) {
		throw new Error(
			"useYoutubeClient must be used within a YoutubeContextProvider"
		);
	}
	return youtubeClient;
}
