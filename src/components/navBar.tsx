import { NavLink } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
export default function NavBar() {
	const handlesubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const searchForm = new FormData(event.target as HTMLFormElement);
		const response = await fetch("/api/search", {
			method: "POST",
			body: searchForm,
		});
	};
	return (
		<>
			<div className='max-w-7xl mx-auto bg-zinc-800 mb-4'>
				<nav className='flex flex-row justify-evenly h-14 text-white text-2xl'>
					<div className='flex flex-none'>
						<button>
							<NavLink to='/'>SCTube</NavLink>
						</button>
					</div>
					<div className='flex justify-center'>
						<form className='flex flex-wrap'>
							<input
								type='text'
								id='searchBar'
								placeholder='Search'
								className='rounded-md h-8 my-auto mx-2 w-max text-block text-black'
							/>
							<button type='submit'>
								<MagnifyingGlassIcon className='h-6 w-6 text-white ' />
							</button>
						</form>
					</div>
					<div className='flex flex-none'>
						<button>
							<NavLink to='/aboutme'>About me</NavLink>
						</button>
					</div>
				</nav>
			</div>
		</>
	);
}
