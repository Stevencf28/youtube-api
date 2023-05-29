import { ReactNode, createContext } from "react";
import { Youtube } from "../services/Youtube";
import { YoutubeClient } from "../services/YoutubeClient";

interface Props {
	children: ReactNode;
}

export const YoutubeContext = createContext({} as Youtube);

export const YoutubeProvider: React.FC<Props> = ({ children }) => {
	const client = new YoutubeClient();
	const youtube = new Youtube(client);

	return (
		<YoutubeContext.Provider value={youtube}>
			{children}
		</YoutubeContext.Provider>
	);
};
