"use client";

import React, { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Resume from "../../components/Resume";
import { fetchContactData, setContactData } from '@/db';

export default function Home() {
  const supabase = createClient();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Default app data
  const [contactFields, setContactFields] = useState({
    'name': {'value': '', 'label': "Name", 'position': 1},
    'email': {'value': '', 'label': "Email address", 'position': 2},
    'phone': {'value': '', 'label': "Phone number", 'position': 3},
    'city': {'value': '', 'label': "City", 'position': 4}
  });
  const [contactFieldCounter, setContactFieldCounter] = useState(5);

  const handleSave = () => {
    setContactData(user.id, contactFields, supabase);
  }

  // Update an app data field
  const updateField = (key, newValue, setFields) => {
    setFields(prev => ({
      ...prev,
      [key]: { ...prev[key], value: newValue }
    }));
  };

  const fieldCountersMap = {
    'contact': {'counter': contactFieldCounter, 'setCounter': setContactFieldCounter}
  }

  const addFieldAbove = (
    targetPosition, 
    setFields, 
    fieldsType
  ) => {
    const fieldLabel = prompt('Enter a label for the new field:');
    if (fieldLabel && fieldLabel.trim()) {
      const newFieldKey = `field_${fieldCountersMap[fieldsType].counter}`;
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
      fieldCountersMap[fieldsType].setCounter(prev => prev + 1);
    }
  };

  const addFieldToEnd = (fields, setFields, fieldsType) => {
    const fieldLabel = prompt('Enter a label for the new field:');
    if (fieldLabel && fieldLabel.trim()) {
      const newFieldKey = `field_${fieldCountersMap[fieldsType].counter}`;
      setFields(prev => {
        const updatedFields = { ...prev };
        updatedFields[newFieldKey] = {
          value: '',
          label: fieldLabel.trim(),
          position: Object.keys(fields).length + 1
        };
        return updatedFields;
      });
      fieldCountersMap[fieldsType].setCounter(prev => prev + 1);
    }
  };

  useEffect(() => {
    // Check if user is logged in
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        redirect('/login');
        return;
      }
      setUser(data.user);
      setLoading(false);
    };

    getUser();
  }, []);

  useEffect(() => {
    // Fetch the user data from Contact table
    const loadContactData = async () => {
      if (!user?.id) return;

      const contactData = await fetchContactData(user.id, supabase);

      if (contactData?.fields) {
        setContactFields(contactData.fields);
      }
    };

    loadContactData();
  }, [user, supabase]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <main className="main-container">
        <div className="downloads-container">
          <button>Download HTML</button>
        </div>
        <Resume
          updateField={updateField}
          addFieldAbove={addFieldAbove}
          addFieldToEnd={addFieldToEnd}
          contactFields={contactFields}
          setContactFields={setContactFields}
          handleSave={handleSave}
        />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p>Footer</p>
      </footer>
    </div>
  );
}
