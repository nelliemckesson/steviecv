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
	const [fieldCounter, setFieldCounter] = useState(5);

	const updateField = (key, newValue) => {
		setFields(prev => ({
			...prev,
			[key]: { ...prev[key], value: newValue }
		}));
	};

	const addFieldAbove = (targetPosition) => {
		const fieldLabel = prompt('Enter a label for the new field:');
		if (fieldLabel && fieldLabel.trim()) {
			const newFieldKey = `field_${fieldCounter}`;
			setFields(prev => {
				const updatedFields = { ...prev };
				Object.keys(updatedFields).forEach(key => {
					if (updatedFields[key].position >= targetPosition) {
						updatedFields[key] = { ...updatedFields[key], position: updatedFields[key].position + 1 };
					}
				});
				updatedFields[newFieldKey] = {
					value: '',
					label: fieldLabel.trim(),
					position: targetPosition
				};
				return updatedFields;
			});
			setFieldCounter(prev => prev + 1);
		}
	};

	const addFieldToEnd = () => {
		const fieldLabel = prompt('Enter a label for the new field:');
		if (fieldLabel && fieldLabel.trim()) {
			const newFieldKey = `field_${fieldCounter}`;
			setFields(prev => {
				const updatedFields = { ...prev };
				updatedFields[newFieldKey] = {
					value: '',
					label: fieldLabel.trim(),
					position: Object.keys(fields).length + 1
				};
				return updatedFields;
			});
			setFieldCounter(prev => prev + 1);
		}
	};

	return (
		<div className="section-container">
		  <div className="section-buttons">
				<button className="edit-mode" onClick={() => setIsEditMode(!isEditMode)}>
					{isEditMode ? 'Save' : 'Edit'}
				</button>
				{isEditMode && (
					<button className="edit-mode" onClick={() => setIsEditMode(false)}>
						Cancel
					</button>
				)}
			</div>
			
			{isEditMode ? (
				<div>
					{Object.entries(fields)
						.sort(([, a], [, b]) => a.position - b.position)
						.map(([key, field]) => (
							<div key={key}>
								<div className="add-field">
									<button
										onClick={() => addFieldAbove(field.position)}
									>
										+
									</button>
								</div>
								<ContactInput
									label={field.label}
									value={field.value}
									updateField={(newValue) => updateField(key, newValue)}
								/>
							</div>
						))
					}
					<div className="add-field">
						<button
							onClick={() => addFieldToEnd()}
						>
							+
						</button>
					</div>
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

const ContactInput = ({ label, value, updateField }) => {
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
