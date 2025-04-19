import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { user, logout } = useAuthStore();

	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

	const { setContentType } = useContentStore();

	return (
		<header className='fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md '>
			<div className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
				<div className='flex items-center gap-10'>
					<Link to='/'>
						<img src='/netflix-logo.png' alt='Netflix Logo' className='w-32 sm:w-40' />
					</Link>

					{/* desktop navbar items */}
					<div className='hidden sm:flex gap-6 items-center'>
						<Link to='/' className='hover:underline' onClick={() => setContentType("movie")}>
							Movies
						</Link>
						<Link to='/' className='hover:underline' onClick={() => setContentType("tv")}>
							Tv Shows
						</Link>
						<Link to='/history' className='hover:underline'>
							Search History
						</Link>
						<Link to='/guess-the-movie' className='hover:underline'>
							Guess The Movie
						</Link>
						<Link to='/watch-page' className='hover:underline'>
							Mood Movie Picker
						</Link>
					</div>
				</div>

				<div className='flex gap-2 items-center'>
					<Link to={"/search"}>
						<Search className='size-6 cursor-pointer' />
					</Link>
					<img src={user.image} alt='Avatar' className='h-8 rounded cursor-pointer' />
					<LogOut className='size-6 cursor-pointer' onClick={logout} />
					<div className='sm:hidden'>
						<Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu} />
					</div>
				</div>
			</div>

			{/* mobile navbar items */}
			{isMobileMenuOpen && (
				<div className='w-full sm:hidden mt-4 bg-black border-t border-gray-800'>
					<Link to={"/"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
						Movies
					</Link>
					<Link to={"/"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
						Tv Shows
					</Link>
					<Link to={"/history"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
						Search History
					</Link>
					<Link to='/guess-the-movie' className='block hover:underline p-2' onClick={toggleMobileMenu}>
							Guess The Movie
						</Link>
					<Link to='/watch-page' className='block hover:underline p-2' onClick={toggleMobileMenu}>
							Mood Movie Picker
						</Link>
				</div>
			)}
		</header>

	);
};
export default Navbar;
