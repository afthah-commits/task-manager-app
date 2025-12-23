import { format } from 'date-fns';

const TaskItem = ({ task, onEdit, onDelete, onToggle }) => {
    const priorityColors = {
        low: '#10b981', // green
        medium: '#f59e0b', // orange
        high: '#ef4444' // red
    };

    return (
        <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: task.is_complete ? 0.7 : 1 }}>
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <input
                        type="checkbox"
                        checked={task.is_complete}
                        onChange={() => onToggle(task)}
                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    />
                    <h3 style={{
                        margin: 0,
                        textDecoration: task.is_complete ? 'line-through' : 'none',
                        color: 'var(--text-color)'
                    }}>
                        {task.title}
                    </h3>
                    <span style={{
                        fontSize: '0.8rem',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '12px',
                        backgroundColor: priorityColors[task.priority] || '#ccc',
                        color: 'white'
                    }}>
                        {task.priority}
                    </span>
                </div>
                {task.description && <p style={{ margin: '0 0 0.5rem 0', color: '#666' }}>{task.description}</p>}
                <div style={{ fontSize: '0.8rem', color: '#888' }}>
                    {task.due_date && <span>Due: {format(new Date(task.due_date), 'MMM d, yyyy')}</span>}
                </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => onEdit(task)} style={{ backgroundColor: '#3b82f6', color: 'white' }}>Edit</button>
                <button onClick={() => onDelete(task.id)} className="btn-danger">Delete</button>
            </div>
        </div>
    );
};

export default TaskItem;
