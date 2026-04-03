import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../axiosConfig';

const FanClubs = () => {
  const [fanClubs, setFanClubs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingClub, setEditingClub] = useState(null);
  const [form, setForm] = useState({ name: '', artist: '', genre: '', description: '', imageUrl: '' });
  const [message, setMessage] = useState('');

  const fetchFanClubs = useCallback(async () => {
    try {
      const res = await axiosInstance.get('/api/fanclubs');
      setFanClubs(res.data);
    } catch (err) {
      setMessage('Error fetching fan clubs');
    }
  }, []);

  useEffect(() => {
    fetchFanClubs();
  }, [fetchFanClubs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingClub) {
        await axiosInstance.put(`/api/fanclubs/${editingClub._id}`, form);
        setMessage('Fan club updated!');
      } else {
        await axiosInstance.post('/api/fanclubs', form);
        setMessage('Fan club created!');
      }
      setForm({ name: '', artist: '', genre: '', description: '', imageUrl: '' });
      setShowForm(false);
      setEditingClub(null);
      fetchFanClubs();
    } catch (err) {
      setMessage('Error saving fan club');
    }
  };

  const handleEdit = (club) => {
    setEditingClub(club);
    setForm({ name: club.name, artist: club.artist, genre: club.genre, description: club.description, imageUrl: club.imageUrl });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this fan club?')) return;
    try {
      await axiosInstance.delete(`/api/fanclubs/${id}`);
      setMessage('Fan club deleted!');
      fetchFanClubs();
    } catch (err) {
      setMessage('Error deleting fan club');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ color: '#6200ea' }}>🎵 Onlystans Fan Clubs</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <button
        onClick={() => { setShowForm(!showForm); setEditingClub(null); setForm({ name: '', artist: '', genre: '', description: '', imageUrl: '' }); }}
        style={{ background: '#6200ea', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', marginBottom: '20px' }}>
        {showForm ? 'Cancel' : '+ Create Fan Club'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: '#f5f5f5', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
          <h3>{editingClub ? 'Edit Fan Club' : 'New Fan Club'}</h3>
          {['name', 'artist', 'genre', 'description', 'imageUrl'].map(field => (
            <div key={field} style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '4px', textTransform: 'capitalize' }}>{field}</label>
              <input
                value={form[field]}
                onChange={e => setForm({ ...form, [field]: e.target.value })}
                required={field !== 'imageUrl'}
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
              />
            </div>
          ))}
          <button type="submit"
            style={{ background: '#6200ea', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            {editingClub ? 'Update' : 'Create'}
          </button>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {fanClubs.map(club => (
          <div key={club._id} style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            {club.imageUrl && (
              <img src={club.imageUrl} alt={club.name}
                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} />
            )}
            <h3 style={{ color: '#6200ea', margin: '0 0 5px' }}>{club.name}</h3>
            <p style={{ margin: '0 0 5px' }}><strong>Artist:</strong> {club.artist}</p>
            <p style={{ margin: '0 0 5px' }}><strong>Genre:</strong> {club.genre}</p>
            <p style={{ margin: '0 0 10px', color: '#666' }}>{club.description}</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleEdit(club)}
                style={{ background: '#ff9800', color: 'white', padding: '6px 14px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Edit
              </button>
              <button onClick={() => handleDelete(club._id)}
                style={{ background: '#e53935', color: 'white', padding: '6px 14px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FanClubs;