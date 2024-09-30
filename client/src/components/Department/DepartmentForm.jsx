import React, { useContext, useState, useEffect, useRef } from 'react';
import { departmentContext } from '../../contexts/Department.context';
import './DepartmentForm.css';

function DepartmentForm({ onClose }) {
  const [DName, setDName] = useState('');
  const [description, setDescription] = useState('');
  const { addDepartment } = useContext(departmentContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await addDepartment({ DName, description });
      setDName('');
      setDescription('');
      onClose(); // Close form after successful submission
    } catch (err) {
      setError('Failed to add department. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      onClose(); // Hide form if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='department-Form-container'>
      <form onSubmit={handleSubmit} className='department-form' ref={formRef}>
        <input
          type="text"
          value={DName}
          onChange={(e) => setDName(e.target.value)}
          placeholder="Department Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Department Description"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Department'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default DepartmentForm;
