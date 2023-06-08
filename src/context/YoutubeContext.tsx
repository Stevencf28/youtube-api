import React, { createContext, useContext } from "react";
import YoutubeClient from "../services/YoutubeClient";

const YoutubeContext = createContext<YoutubeClient | undefined>(undefined);

interface YoutubeContextProviderProps {
	children: React.ReactNode;
}
const youtubeClient = new YoutubeClient();

export function YoutubeContextProvider({
	children,
}: YoutubeContextProviderProps): JSX.Element {
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
