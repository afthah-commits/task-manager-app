import { useState, useEffect } from 'react';
import api from '../services/api';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';
import ProgressBar from '../components/ProgressBar';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all'); // all, completed, pending
    const [search, setSearch] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const { logout, user } = useAuth();

    useEffect(() => {
        fetchTasks();
    }, [filter]); // Re-fetch when filter changes

    // Debounce search could be added, but for simple app just filter locally or fetch on submit
    // Here implementing fetch on search change with small delay or just Button?
    // Let's doing simple local filtering for search or API search? 
    // API has search. Let's use API search hooked to effect with debounce.
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchTasks();
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const fetchTasks = async () => {
        try {
            const params = {};
            if (filter !== 'all') params.status = filter;
            if (search) params.search = search;

            const response = await api.get('tasks/', { params });
            setTasks(response.data);
        } catch (error) {
            console.error("Failed to fetch tasks", error);
        }
    };

    const handleCreateOrUpdate = async (taskData) => {
        try {
            if (editingTask) {
                await api.patch(`tasks/${editingTask.id}/`, taskData);
            } else {
                await api.post('tasks/', taskData);
            }
            setShowForm(false);
            setEditingTask(null);
            fetchTasks(); // Refresh list
        } catch (error) {
            alert("Error saving task");
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure?")) {
            try {
                await api.delete(`tasks/${id}/`);
                setTasks(tasks.filter(t => t.id !== id));
            } catch (error) {
                console.error("Error deleting", error);
            }
        }
    };

    const handleToggle = async (task) => {
        try {
            await api.patch(`tasks/${task.id}/`, { is_complete: !task.is_complete });
            fetchTasks(); // Refresh to update list specific attributes (like sorting?) or just update local
            // setTasks(prev => prev.map(t => t.id === task.id ? { ...t, is_complete: !t.is_complete } : t)); 
        } catch (error) {
            console.error("Error toggling", error);
        }
    };

    const startEdit = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    return (
        <div className="container">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Task Manager</h1>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span>Welcome, {user?.username}</span>
                    <button onClick={() => {
                        const newTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
                        document.documentElement.dataset.theme = newTheme;
                        localStorage.setItem('theme', newTheme);
                    }} style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-color)' }}>
                        Toggle Theme
                    </button>
                    <button onClick={logout} style={{ backgroundColor: '#e2e8f0', color: '#000' }}>Logout</button>
                </div>
            </header>

            <div className="card" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ flex: 1 }}
                    />
                    <select value={filter} onChange={(e) => setFilter(e.target.value)} style={{ width: 'auto' }}>
                        <option value="all">All Tasks</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>
                    <button
                        className="btn-primary"
                        onClick={() => { setEditingTask(null); setShowForm(!showForm); }}
                    >
                        {showForm ? 'Close Form' : 'Add Task'}
                    </button>
                </div>
            </div>

            {showForm && (
                <div style={{ marginBottom: '2rem' }}>
                    <TaskForm
                        onSubmit={handleCreateOrUpdate}
                        initialData={editingTask}
                        onCancel={() => { setShowForm(false); setEditingTask(null); }}
                    />
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onEdit={startEdit}
                        onDelete={handleDelete}
                        onToggle={handleToggle}
                    />
                ))}
                {tasks.length === 0 && <p style={{ textAlign: 'center', color: '#888' }}>No tasks found.</p>}
            </div>
        </div>
    );
};

export default Dashboard;
