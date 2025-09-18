"use client";

import React, { useState } from 'react';

const Contact = (props) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [city, setCity] = useState('');
	const [isEditMode, setIsEditMode] = useState(false);

	return (
		<div className="section-container">
			<button className="edit-mode" onClick={() => setIsEditMode(!isEditMode)}>
				{isEditMode ? 'Save' : 'Edit'}
			</button>
			
			{isEditMode ? (
				<div>
					<div>
						<label>Name: </label>
						<input 
							type="text" 
							value={name} 
							onChange={(e) => setName(e.target.value)} 
						/>
					</div>
					<div>
						<label>Email: </label>
						<input 
							type="email" 
							value={email} 
							onChange={(e) => setEmail(e.target.value)} 
						/>
					</div>
					<div>
						<label>Phone: </label>
						<input 
							type="tel" 
							value={phone} 
							onChange={(e) => setPhone(e.target.value)} 
						/>
					</div>
					<div>
						<label>City: </label>
						<input 
							type="text" 
							value={city} 
							onChange={(e) => setCity(e.target.value)} 
						/>
					</div>
				</div>
			) : (
				<div>
					<p>{name || "My Name"}</p>
					<p>{email || "Email address"}</p>
					<p>{phone || "Phone number"}</p>
					<p>{city || "My City"}</p>
				</div>
			)}
		</div>
	);
}

export default Contact;
