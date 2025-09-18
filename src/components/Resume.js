"use client";

import React, { useState } from 'react';
import Contact from "./Contact";

const Resume = (props) => {
	return (
		<div className="resume-container">
      <Contact 
        updateField={props.updateField} 
        addFieldAbove={props.addFieldAbove} 
        addFieldToEnd={props.addFieldToEnd} 
        fields={props.contactFields}
        setFields={props.setContactFields}
      />
    </div>
	);
}

export default Resume;
