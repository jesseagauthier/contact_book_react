import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ContactList from './components/ContactList.jsx'
import ContactDetails from './components/ContactDetails.jsx'
import AddContact from './components/AddContact.jsx'
import Header from './components/Header.jsx'
function App() {
	return (
		<>
			<Router>
				<Header />
				<Routes>
					<Route path='/' element={<ContactList />} />
					<Route path='/contacts/:contactId' element={<ContactDetails />} />
					<Route path='/add-contact' element={<AddContact />} />
					<Route path='*' element={<ContactList />} />
				</Routes>
			</Router>
		</>
	)
}

export default App
