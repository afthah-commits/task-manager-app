const ProgressBar = ({ tasks }) => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.is_complete).length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <div style={{ marginBottom: '1.5rem', backgroundColor: 'var(--card-bg)', padding: '1rem', borderRadius: '8px', boxShadow: 'var(--shadow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 500 }}>Overall Progress</span>
                <span style={{ fontWeight: 500 }}>{percentage}%</span>
            </div>
            <div style={{ width: '100%', height: '10px', backgroundColor: 'var(--border)', borderRadius: '5px', overflow: 'hidden' }}>
                <div
                    style={{
                        width: `${percentage}%`,
                        height: '100%',
                        backgroundColor: 'var(--primary)',
                        transition: 'width 0.5s ease-in-out'
                    }}
                />
            </div>
            <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.5rem', textAlign: 'right' }}>
                {completed} of {total} tasks completed
            </div>
        </div>
    );
};

export default ProgressBar;
