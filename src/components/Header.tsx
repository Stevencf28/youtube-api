import { NavLink } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { FaLinkedin } from "react-icons/fa";
export default function Header() {
	const handlesubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const apiKey = process.env.API_KEY;
		const searchForm = new FormData(event.target as HTMLFormElement);
		const response = await fetch("/api/search", {
			method: "POST",
			body: searchForm,
		});
	};
	return (
		<>
			<header className='w-full flex flex-wrap sm:flex-nowrap items-center sm:justify-evenly justify-between mb-4 p-4 text-2xl'>
				<NavLink to='/' className='order-1 font-semibold'>
					SCTube
				</NavLink>
				<form
					className='flex flex-grow justify-center order-2 sm:px-2 mt-4 sm:mt-0 sm:max-w-md'
					onSubmit={handlesubmit}
				>
					<input
						type='text'
						id='searchBar'
						placeholder='Search'
						className='rounded-l-md border-0 h-8 w-full form-input text-block focus:ring-0 text-black text-center'
					/>
					<button type='submit' className='rounded-r-md btn border-0 h-8 px-2 '>
						<MagnifyingGlassIcon className='h-4 w-6' />
					</button>
				</form>
				<a
					href='https://www.linkedin.com/in/stevencf/'
					className='order-1 sm:order-3'
				>
					<FaLinkedin className='h-8 w-8 text-white' />
				</a>
			</header>
		</>
	);
}
