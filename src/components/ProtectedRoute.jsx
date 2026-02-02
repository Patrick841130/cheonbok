import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function ProtectedRoute({ children }) {
    const location = useLocation();
    const { isAuthenticated, verifyToken } = useAuthStore();
    const [isVerifying, setIsVerifying] = useState(true);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const verify = async () => {
            setIsVerifying(true);
            const valid = await verifyToken();
            setIsValid(valid);
            setIsVerifying(false);
        };
        verify();
    }, [verifyToken]);

    if (isVerifying) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-slate-500 font-bold">인증 확인 중...</p>
                </div>
            </div>
        );
    }

    if (!isValid && !isAuthenticated) {
        // Store the attempted URL for redirecting after login
        return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }

    return children;
}
