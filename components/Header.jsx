import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
	const [theme, setTheme] = useState('cupcake') // Default to 'cupcake'

	useEffect(() => {
		// Load the current theme from localStorage or default to 'cupcake'
		const currentTheme = localStorage.getItem('theme') ?? 'cupcake'
		setTheme(currentTheme)
		document.documentElement.setAttribute('data-theme', currentTheme)
	}, [])

	const toggleTheme = () => {
		const newTheme = theme === 'cupcake' ? 'dark' : 'cupcake'
		setTheme(newTheme)
		localStorage.setItem('theme', newTheme)
		document.documentElement.setAttribute('data-theme', newTheme)
	}

	return (
		<header className='bg-blue-500 text-white p-4'>
			<div className='container mx-auto flex justify-between items-center'>
				<div className='text-lg md:text-xl font-bold'>
					<Link to='/'>Contact Book</Link>
				</div>
				<div className='flex items-center gap-4'>
					<nav className='flex gap-4'>
						<Link
							to='/'
							className='hover:bg-blue-700 p-2 rounded transition-colors duration-200'
						>
							Home
						</Link>
						<Link
							to='/add-contact'
							className='hover:bg-blue-700 p-2 rounded transition-colors duration-200'
						>
							Add Contact
						</Link>
					</nav>
					<button
						onClick={toggleTheme}
						className='bg-blue-700 hover:bg-blue-800 p-2 rounded transition-colors duration-200 flex items-center justify-center w-10 h-10'
					>
						{theme === 'cupcake' ? (
							<svg
								className='w-6 h-6'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M12 2a7 7 0 00-7 7c0 1.656 2.672 5 7 5s7-3.344 7-5a7 7 0 00-7-7z'
								></path>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M12 22a7 7 0 01-7-7c0-1.656 2.672-5 7-5s7 3.344 7 5a7 7 0 01-7 7z'
								></path>
							</svg>
						) : (
							<svg
								className='w-6 h-6'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z'
								></path>
							</svg>
						)}
					</button>
				</div>
			</div>
		</header>
	)
}

export default Header
