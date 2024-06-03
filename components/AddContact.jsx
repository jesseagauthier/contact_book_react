import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../db.js'
import { collection, addDoc } from 'firebase/firestore'

const AddContact = () => {
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [telephone, setTelephone] = useState('')
	const [address, setAddress] = useState('')
	const [website, setWebsite] = useState('')
	const [alert, setAlert] = useState({ show: false, message: '', type: '' })
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			await addDoc(collection(db, 'contacts'), {
				firstName,
				lastName,
				email,
				telephone,
				address,
				website,
			})

			setAlert({
				show: true,
				message: 'Contact added successfully!',
				type: 'success',
			})
			setFirstName('')
			setLastName('')
			setEmail('')
			setTelephone('')
			setAddress('')
			setWebsite('')

			setTimeout(() => {
				setAlert({ ...alert, show: false })
			}, 3000)
		} catch (error) {
			console.error('Error adding document: ', error)
			setAlert({
				show: true,
				message: 'Failed to add contact. Please try again.',
				type: 'error',
			})
			setTimeout(() => {
				setAlert({ ...alert, show: false })
			}, 3000)
		}
	}

	return (
		<div className='max-w-md mx-auto mt-10'>
			<h2 className='text-xl font-bold mb-5'>New Contact</h2>
			<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
				<input
					type='text'
					placeholder='First Name'
					className='input input-bordered w-full'
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
				/>
				<input
					type='text'
					placeholder='Last Name'
					className='input input-bordered w-full'
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					required
				/>
				<input
					type='email'
					placeholder='Email'
					className='input input-bordered w-full'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type='text'
					placeholder='Telephone'
					className='input input-bordered w-full'
					value={telephone}
					onChange={(e) => setTelephone(e.target.value)}
				/>
				<input
					type='text'
					placeholder='Address'
					className='input input-bordered w-full'
					value={address}
					onChange={(e) => setAddress(e.target.value)}
				/>
				<input
					type='url'
					placeholder='Website'
					className='input input-bordered w-full'
					value={website}
					onChange={(e) => setWebsite(e.target.value)}
				/>
				<button type='submit' className='btn btn-primary mt-4'>
					Add Contact
				</button>
			</form>
			{alert.show && (
				<div
					className={`alert shadow-lg mt-4 ${
						alert.type === 'success' ? 'alert-success' : 'alert-error'
					}`}
				>
					<div>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='stroke-current flex-shrink-0 h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d={
									alert.type === 'success'
										? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
										: 'M10 14v2m4-2v2m1-10h-6a2 2 0 00-2 2v11a2 2 0 002 2h6a2 2 0 002-2V8a2 2 0 00-2-2z'
								}
							/>
						</svg>
						<span>{alert.message}</span>
					</div>
				</div>
			)}
		</div>
	)
}

export default AddContact
