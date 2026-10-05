import React, { useEffect, useState } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const API_BASE = API_BASE_URL;
const TOKEN_KEY = 'admin_jwt_token';

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_BASE}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok && data.token) {
                localStorage.setItem(TOKEN_KEY, data.token);
                onLogin(data.token);
            } else {
                setError(data.message || 'Invalid credentials');
            }
        } catch (err) {
            setError('Could not reach the server. Is the backend running?');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <p className="text-cyan-400 font-semibold mb-2 text-sm tracking-widest">ADMIN</p>
                <h1 className="text-3xl font-bold text-white mb-6">Sign In</h1>

                {error && (
                    <div className="mb-5 bg-red-900/40 border border-red-700 text-red-300 rounded-lg px-4 py-3 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-slate-400 text-sm mb-1">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="username"
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5
                                       text-white placeholder-slate-500 focus:outline-none
                                       focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                            placeholder="admin"
                        />
                    </div>

                    <div>
                        <label className="block text-slate-400 text-sm mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5
                                       text-white placeholder-slate-500 focus:outline-none
                                       focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-60
                                   text-white font-semibold py-2.5 rounded-lg transition"
                    >
                        {loading ? 'Signing in…' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}

function MessageList({ token, onLogout }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            setError('');

            try {
                const response = await fetch(`${API_BASE}/api/contact`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.status === 401 || response.status === 403) {
                    // Token is invalid or expired — force re-login
                    localStorage.removeItem(TOKEN_KEY);
                    onLogout();
                    return;
                }

                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }

                const data = await response.json();
                setMessages(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch messages');
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [token, onLogout]);

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this message?')) return;

        try {
            const response = await fetch(`${API_BASE}/api/contact/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 401 || response.status === 403) {
                localStorage.removeItem(TOKEN_KEY);
                onLogout();
                return;
            }

            setMessages((prev) => prev.filter((m) => m.id !== id));
        } catch (err) {
            alert('Failed to delete message.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white px-6 py-20">
            <div className="max-w-6xl mx-auto">

                <div className="mb-10 flex items-start justify-between">
                    <div>
                        <p className="text-cyan-400 font-semibold mb-2 tracking-widest text-sm">ADMIN</p>
                        <h1 className="text-4xl font-bold">Contact Messages</h1>
                        <p className="text-slate-400 mt-3">Messages submitted through your portfolio.</p>
                    </div>
                    <button
                        onClick={() => { localStorage.removeItem(TOKEN_KEY); onLogout(); }}
                        className="mt-2 text-sm text-slate-400 hover:text-white border border-slate-700
                                   hover:border-slate-500 px-4 py-2 rounded-lg transition"
                    >
                        Sign Out
                    </button>
                </div>

                {loading ? (
                    <p className="text-slate-400">Loading messages…</p>
                ) : error ? (
                    <div className="bg-red-900/40 border border-red-700 text-red-300 rounded-xl p-6">
                        {error}
                    </div>
                ) : messages.length === 0 ? (
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
                        <p className="text-slate-400">No messages yet.</p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className="bg-slate-900 border border-slate-800 rounded-xl p-6"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
                                    <div>
                                        <h2 className="text-xl font-semibold">{message.name}</h2>
                                        <p className="text-cyan-400">{message.email}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="text-slate-500 text-sm">
                                            {message.createdAt
                                                ? new Date(message.createdAt).toLocaleString()
                                                : ''}
                                        </p>
                                        <button
                                            onClick={() => handleDelete(message.id)}
                                            className="text-xs text-red-400 hover:text-red-300 border border-red-800
                                                       hover:border-red-600 px-3 py-1.5 rounded-lg transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-slate-950 rounded-lg p-4">
                                    <p className="text-slate-300 whitespace-pre-wrap">{message.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function AdminMessages() {
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

    if (!token) {
        return <LoginForm onLogin={(t) => setToken(t)} />;
    }

    return (
        <MessageList
            token={token}
            onLogout={() => setToken(null)}
        />
    );
}

export default AdminMessages;