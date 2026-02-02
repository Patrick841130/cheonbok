import { Component } from 'react';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo });
        // Log error to console (could send to error tracking service)
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
                    <div className="bg-white rounded-2xl p-10 max-w-lg w-full text-center shadow-2xl">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-black text-slate-900 mb-2">오류가 발생했습니다</h1>
                        <p className="text-slate-500 mb-6">
                            예상치 못한 오류가 발생했습니다. 다시 시도해 주세요.
                        </p>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <div className="bg-slate-100 p-4 rounded-lg mb-6 text-left overflow-auto max-h-40">
                                <code className="text-sm text-red-600 break-all">
                                    {this.state.error.toString()}
                                </code>
                            </div>
                        )}
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={this.handleRetry}
                                className="px-6 py-3 bg-[#E60013] text-white font-bold rounded-xl hover:bg-[#c40010] transition shadow-lg"
                            >
                                다시 시도
                            </button>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="px-6 py-3 bg-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-300 transition"
                            >
                                홈으로
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
