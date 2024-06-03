import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../db.js'

const ContactDetails = () => {
	const { contactId } = useParams()
	const [contact, setContact] = useState({
		firstName: '',
		lastName: '',
		email: '',
		telephone: '',
		website: '',
		address: '',
	})
	const [isEditing, setIsEditing] = useState(false)
	const [alert, setAlert] = useState({ show: false, message: '', type: '' }) // Updated for alert
	const navigate = useNavigate()

	useEffect(() => {
		const fetchContact = async () => {
			const docRef = doc(db, 'contacts', contactId)
			const docSnap = await getDoc(docRef)

			if (docSnap.exists()) {
				setContact({ id: docSnap.id, ...docSnap.data() })
			} else {
				console.log('No such document!')
			}
		}

		fetchContact()
	}, [contactId])

	const handleInputChange = (e) => {
		const { name, value } = e.target
		setContact({ ...contact, [name]: value })
	}

	const handleSave = async () => {
		if (isEditing) {
			const docRef = doc(db, 'contacts', contactId)
			try {
				await updateDoc(docRef, { ...contact })
				setAlert({
					show: true,
					message: 'Contact updated successfully!',
					type: 'success',
				})
			} catch (error) {
				console.error('Error updating document: ', error)
				setAlert({
					show: true,
					message: 'Failed to update contact.',
					type: 'error',
				})
			}
		}
		setIsEditing(!isEditing)
		setTimeout(() => setAlert({ ...alert, show: false }), 3000)
	}

	const fieldOrder = [
		'firstName',
		'lastName',
		'email',
		'telephone',
		'website',
		'address',
	]

	return (
		<div className='max-w-md mx-auto mt-10'>
			<h2 className='text-xl font-bold mb-4'>Contact Information</h2>
			<div className='border-2 rounded p-3 my-3'>
				{fieldOrder.map((field) => (
					<div key={field} className='mb-2'>
						<strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>
						{isEditing ? (
							<input
								type='text'
								name={field}
								value={contact[field]}
								onChange={handleInputChange}
								className='input input-bordered w-full ml-2 capitalize'
							/>
						) : (
							<span className='ml-2'>{contact[field]}</span>
						)}
					</div>
				))}
			</div>
			<button onClick={handleSave} className='btn btn-primary mr-2 rounded-xl'>
				{isEditing ? 'Save' : 'Modify'}
			</button>
			<button
				onClick={() => navigate(-1)}
				className='btn btn-secondary rounded-xl'
			>
				Back
			</button>
			{alert.show && (
				<div
					className={`alert ${
						alert.type === 'success' ? 'alert-success' : 'alert-error'
					} my-3`}
				>
					<div>
						<span>{alert.message}</span>
					</div>
				</div>
			)}
		</div>
	)
}

export default ContactDetails
