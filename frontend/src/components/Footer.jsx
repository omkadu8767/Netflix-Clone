const Footer = () => {
	return (
		<footer className='py-6 md:px-8 bg-black text-white border-t border-gray-800'>
			<div className='flex flex-col items-center justify-center text-center'>
				<p className='text-sm font-semibold tracking-wider text-white'>
					Developed by{" "}
					<a
						href='https://github.com/omkadu8767'
						target='_blank'
						rel='noreferrer'
						className='text-red-600 hover:underline hover:text-red-500 transition-colors duration-200'
					>
						OK
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
