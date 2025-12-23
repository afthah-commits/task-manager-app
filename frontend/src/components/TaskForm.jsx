import { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, onCancel, initialData }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium',
        due_date: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                description: initialData.description || '',
                priority: initialData.priority || 'medium',
                due_date: initialData.due_date ? initialData.due_date.substring(0, 16) : '' // format for datetime-local
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="card">
            <h3 style={{ marginTop: 0 }}>{initialData ? 'Edit Task' : 'Add New Task'}</h3>
            <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Priority</label>
                    <select name="priority" value={formData.priority} onChange={handleChange}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Due Date</label>
                    <input
                        type="datetime-local"
                        name="due_date"
                        value={formData.due_date}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button type="button" onClick={onCancel} style={{ backgroundColor: '#9ca3af', color: 'white' }}>Cancel</button>
                <button type="submit" className="btn-primary">Save Task</button>
            </div>
        </form>
    );
};

export default TaskForm;
