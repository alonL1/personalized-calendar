'use client';

import { useState } from 'react';
import EventList from '@/components/EventList';

export default function Home() {
  const [form, setForm] = useState({
    location: '',
    interests: ''
  });
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setEvents([]);

    try {
      const response = await fetch('http://localhost:5000/user-preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Unknown error occurred');
      }

      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError('Error with event generation. Please try again.')
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Set Your Preferences</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="location" placeholder="Location" onChange={handleChange} className="w-full p-2 border" />
        <input name="interests" placeholder="Hobbies and Interests (comma-separated)" onChange={handleChange} className="w-full p-2 border" />
        <button type="submit" className="bg-blue-500 text-white p-2">Submit</button>
      </form>
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded">
          {error}
        </div>
      )}
      <EventList events={events} />
    </main>
  );
}
