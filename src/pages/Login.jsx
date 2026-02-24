import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function Login() {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const { login, isLoading, error, clearError } = useAuthStore();

    const handleLogin = async (e) => {
        e.preventDefault();
        clearError();

        const success = await login(id, pw);
        if (success) {
            // Redirect to the page they tried to access, or admin
            const from = location.state?.from?.pathname || '/admin';
            navigate(from, { replace: true });
        }
    };

    return (
        <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-6">
            <div className="bg-[#1E293B] rounded-2xl p-10 w-full max-w-md shadow-2xl border border-[#334155]">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-black text-white">Admin Access</h1>
                    <p className="text-[#94A3B8] text-sm">Web3 Academy Security Gateway</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-[#94A3B8] mb-2">ID</label>
                        <input
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-[#334155] bg-[#0F172A] text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition placeholder-[#475569]"
                            placeholder="Admin ID"
                            disabled={isLoading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-[#94A3B8] mb-2">Password</label>
                        <input
                            type="password"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-[#334155] bg-[#0F172A] text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition placeholder-[#475569]"
                            placeholder="Access Key"
                            disabled={isLoading}
                        />
                    </div>

                    {error && <p className="text-red-400 text-sm font-bold text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-blue-600 disabled:bg-[#475569] text-white py-4 rounded-xl font-bold transition shadow-lg glow-blue"
                    >
                        {isLoading ? 'Authenticating...' : 'Access Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
}
