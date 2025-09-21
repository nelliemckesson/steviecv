"use client";

import React, { useState } from 'react';

const Contact = (props) => {
	const [isEditMode, setIsEditMode] = useState(false);
	const { fields, setFields } = props;

	const handleToggleEditMode = () => {
		if (isEditMode) {
			props.handleSave();
		}
		setIsEditMode(prev => !prev);
	}

	return (
		<div className="section-container">
		  <div className="section-buttons">
				<button className="edit-mode" onClick={() => handleToggleEditMode()}>
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
										onClick={() => {
											props.addFieldAbove(
												field.position, 
												setFields, 
												"contact"
											)
										}}
									>
										+
									</button>
								</div>
								<ContactInput
									label={field.label}
									value={field.value}
									updateField={(newValue) => props.updateField(key, newValue, setFields)}
								/>
							</div>
						))
					}
					<div className="add-field">
						<button
							onClick={() => {
								addFieldToEnd(
								  fields,
									setFields, 
									"contact"
								)
							}}
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
			<label>{label}: </label>
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
