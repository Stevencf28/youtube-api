import { NavLink } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { FaLinkedin } from "react-icons/fa";
import "../styles/Header.css";
export default function Header() {
	const handlesubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};
	return (
		<>
			<header className='w-full flex flex-wrap md:flex-nowrap items-center justify-between p-4 text-2xl'>
				<NavLink reloadDocument to='/' className='text-3xl order-1 font-medium'>
					SCTube
				</NavLink>
				<p className='hidden md:visible'>test</p>
				<form
					className='flex flex-auto justify-center w-full order-2 md:px-2 mt-4 md:mt-0 md:max-w-lg'
					onSubmit={handlesubmit}
				>
					<input
						type='text'
						id='searchBar'
						placeholder='Search'
						className='rounded-l-md border-0 h-10 w-full form-input text-block focus:ring-0 text-black text-center'
					/>
					<button
						type='submit'
						className='rounded-r-md btn border-0 h-10 px-4 '
					>
						<MagnifyingGlassIcon className='h-8 w-6' />
					</button>
				</form>
				<a
					href='https://www.linkedin.com/in/stevencf/'
					className='order-1 md:order-3'
				>
					<FaLinkedin className='h-10 w-10 text-white' />
				</a>
			</header>
		</>
	);
}
