import { useEffect } from "react";

export default function Home() {
	useEffect(() => {
		document.title = "SCTube";
	});

	return (
		<>
			<div className='text-3xl '>test</div>
		</>
	);
}
