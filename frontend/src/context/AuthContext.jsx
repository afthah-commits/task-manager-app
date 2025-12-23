import { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // Check expiry
                if (decoded.exp * 1000 > Date.now()) {
                    setUser({ username: decoded.username || 'User', id: decoded.user_id });
                } else {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                }
            } catch (error) {
                console.error("Invalid token", error);
                localStorage.removeItem('access_token');
            }
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        const response = await api.post('auth/login/', { username, password });
        const { access, refresh } = response.data;

        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);

        const decoded = jwtDecode(access);
        setUser({ username: username, id: decoded.user_id });
    };

    const register = async (username, email, password) => {
        await api.post('auth/register/', { username, email, password });
        // Auto login after register? or redirect. Let's return true.
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
