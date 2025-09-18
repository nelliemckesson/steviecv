"use client";

import React, { useState } from 'react';

const Contact = (props) => {
	const [fields, setFields] = useState({
		'name': {'value': '', 'label': "Name", 'position': 1},
		'email': {'value': '', 'label': "Email address", 'position': 2},
		'phone': {'value': '', 'label': "Phone number", 'position': 3},
		'city': {'value': '', 'label': "City", 'position': 4}
	});
	const [isEditMode, setIsEditMode] = useState(false);

	const updateField = (key, newValue) => {
		setFields(prev => ({
			...prev,
			[key]: { ...prev[key], value: newValue }
		}));
	};

	return (
		<div className="section-container">
			<button className="edit-mode" onClick={() => setIsEditMode(!isEditMode)}>
				{isEditMode ? 'Save' : 'Edit'}
			</button>
			
			{isEditMode ? (
				<div>
					{Object.entries(fields)
						.sort(([, a], [, b]) => a.position - b.position)
						.map(([key, field]) => (
							<ContactInput
								key={key}
								label={field.label}
								value={field.value}
								updateField={(newValue) => updateField(key, newValue)}
							/>
						))
					}
				</div>
			) : (
				<div>
					{Object.entries(fields)
						.sort(([, a], [, b]) => a.position - b.position)
						.map(([key, field]) => (
							<ContactItem key={key} {...field} />
						))
					}
				</div>
			)}
		</div>
	);
}

const ContactInput = (label, value, updateField) => {
	return (
		<div>
			<label>{label}</label>
			<input 
				type="text" 
				value={value} 
				onChange={(e) => updateField(e.target.value)} 
			/>
		</div>
	);
}

const ContactItem = (item) => {
	return (
		<p>{item.value || item.label}</p>
	);
}

export default Contact;
