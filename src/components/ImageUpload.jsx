import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function ImageUpload({ value, onChange, className = '' }) {
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const handleFile = async (file) => {
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('이미지 파일만 업로드 가능합니다.');
            return;
        }

        // Validate file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
            setError('파일 크기는 10MB 이하여야 합니다.');
            return;
        }

        setUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('image', file);

            const token = localStorage.getItem('authToken');
            const response = await fetch(`${API_BASE_URL}/api/upload`, {
                method: 'POST',
                headers: token ? { Authorization: `Bearer ${token}` } : {},
                body: formData,
            });

            if (!response.ok) {
                throw new Error('업로드 실패');
            }

            const data = await response.json();
            onChange(`${API_BASE_URL}${data.url}`);
        } catch (e) {
            setError(e.message || '이미지 업로드에 실패했습니다.');
        } finally {
            setUploading(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => setDragOver(false);

    const handleClick = () => fileInputRef.current?.click();

    const handleInputChange = (e) => {
        const file = e.target.files[0];
        handleFile(file);
    };

    const handleClear = () => {
        onChange('');
        setError(null);
    };

    return (
        <div className={className}>
            <input
                type="hidden"
                value={value}
            />
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
            />

            {value ? (
                <div className="relative group">
                    <img
                        src={value}
                        alt="Uploaded"
                        className="w-full h-48 object-cover rounded-xl border border-gray-200"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-4">
                        <button
                            type="button"
                            onClick={handleClick}
                            className="p-3 bg-white rounded-full text-slate-700 hover:bg-slate-100 transition"
                        >
                            <Upload size={20} />
                        </button>
                        <button
                            type="button"
                            onClick={handleClear}
                            className="p-3 bg-white rounded-full text-red-600 hover:bg-red-50 transition"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    onClick={handleClick}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    className={`
            border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
            ${dragOver ? 'border-primary bg-red-50' : 'border-gray-300 hover:border-gray-400'}
            ${uploading ? 'opacity-50 pointer-events-none' : ''}
          `}
                >
                    {uploading ? (
                        <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-3"></div>
                            <p className="text-sm text-slate-500">업로드 중...</p>
                        </div>
                    ) : (
                        <>
                            <ImageIcon size={40} className="mx-auto text-slate-300 mb-3" />
                            <p className="text-slate-600 font-medium mb-1">
                                클릭하거나 이미지를 드래그하세요
                            </p>
                            <p className="text-xs text-slate-400">
                                JPEG, PNG, GIF, WebP (최대 10MB)
                            </p>
                        </>
                    )}
                </div>
            )}

            {error && (
                <p className="text-red-600 text-sm mt-2 font-medium">{error}</p>
            )}

            {/* Manual URL input fallback */}
            <div className="mt-3">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="또는 이미지 URL을 직접 입력하세요"
                    className="w-full px-4 py-2 text-sm rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition bg-slate-50"
                />
            </div>
        </div>
    );
}
