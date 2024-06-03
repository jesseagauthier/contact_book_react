import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
	collection,
	getDocs,
	query,
	orderBy,
	deleteDoc,
	doc,
} from 'firebase/firestore'
import { db } from '../db.js'

const ContactList = () => {
	const [contacts, setContacts] = useState([])
	const [searchTerm, setSearchTerm] = useState('')
	const [loading, setLoading] = useState(true)
	const [deleteAlert, setDeleteAlert] = useState({ show: false, message: '' })

	useEffect(() => {
		const fetchContacts = async () => {
			setLoading(true)
			const q = query(collection(db, 'contacts'), orderBy('lastName'))
			const querySnapshot = await getDocs(q)
			const contactsArray = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}))
			setContacts(contactsArray)
			setLoading(false)
		}

		fetchContacts()
	}, [])

	const handleDelete = async (contactId) => {
		try {
			await deleteDoc(doc(db, 'contacts', contactId))
			setContacts(contacts.filter((contact) => contact.id !== contactId))
			setDeleteAlert({ show: true, message: 'Contact successfully deleted.' })
			setTimeout(() => setDeleteAlert({ ...deleteAlert, show: false }), 3000)
		} catch (error) {
			console.error('Error deleting document: ', error)
		}
	}

	const filteredContacts = contacts
		.filter(
			(contact) =>
				contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
				contact.lastName.toLowerCase().includes(searchTerm.toLowerCase())
		)
		.sort((a, b) => a.lastName.localeCompare(b.lastName))

	return (
		<div className='max-w-4xl mx-auto mt-10 shadow-lg p-6 rounded-lg'>
			<div className='mb-4 relative'>
				<input
					type='text'
					className='input input-bordered w-full pl-10'
					placeholder='Search contacts...'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>
			{deleteAlert.show && (
				<div className='alert alert-success shadow-lg mb-4'>
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
								d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
							/>
						</svg>
						<span>{deleteAlert.message}</span>
					</div>
				</div>
			)}
			<div className='overflow-x-auto'>
				<table className='table w-full'>
					<thead>
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th className='text-end pr-14'>Action</th>
						</tr>
					</thead>
					<tbody>
						{filteredContacts.map((contact) => (
							<tr key={contact.id}>
								<td>{contact.firstName}</td>
								<td>{contact.lastName}</td>
								<td className='flex justify-end items-center gap-2'>
									<Link
										to={`/contacts/${contact.id}`}
										className='btn btn-primary rounded-xl'
									>
										View
									</Link>
									<button
										onClick={() => handleDelete(contact.id)}
										className='btn btn-error rounded-xl'
									>
										Delete
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{loading && <div className='text-center py-10'>Loading contacts...</div>}
			{!loading && filteredContacts.length === 0 && (
				<div className='text-center py-10'>No contacts found.</div>
			)}
		</div>
	)
}

export default ContactList
