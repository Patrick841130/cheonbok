import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useDataStore } from '../stores/dataStore';
import { Plus, Trash, Save, Edit, LogOut } from 'lucide-react';
import { convertGoogleDriveLink } from '../lib/utils';
import ImageUpload from '../components/ImageUpload';

export default function Admin() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('news');
    const [saving, setSaving] = useState(false);
    const [activeScheduleTrack, setActiveScheduleTrack] = useState('basic');
    const [editingNews, setEditingNews] = useState(null);

    // Auth store
    const { logout } = useAuthStore();

    // Data store
    const {
        news, newsLoading, fetchNews, addNews, updateNews, deleteNews: deleteNewsStore,
        instructors, instructorsLoading, fetchInstructors, updateInstructor, saveInstructors,
        schedule, fetchSchedule, updateSchedule, saveSchedule,
    } = useDataStore();

    useEffect(() => {
        fetchNews();
        fetchInstructors();
        fetchSchedule();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    // --- News Handlers ---
    const saveNews = async (e) => {
        e.preventDefault();
        setSaving(true);
        const formData = new FormData(e.target);
        const rawImage = formData.get('image');

        const newItem = {
            id: editingNews.id || Date.now(),
            title: formData.get('title'),
            category: formData.get('category'),
            date: formData.get('date'),
            image: convertGoogleDriveLink(rawImage),
            content: formData.get('content')
        };

        if (editingNews.id) {
            await updateNews(editingNews.id, newItem);
        } else {
            await addNews(newItem);
        }

        setSaving(false);
        setEditingNews(null);
    };

    const handleDeleteNews = async (id) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        await deleteNewsStore(id);
    };

    // --- Instructor Handlers ---
    const handleUpdateInstructor = (id, field, value) => {
        let finalValue = value;
        if (field === 'image' && value.includes('drive.google.com')) {
            finalValue = convertGoogleDriveLink(value);
        }
        updateInstructor(id, field, finalValue);
    };

    const handleSaveInstructors = async () => {
        setSaving(true);
        await saveInstructors();
        setSaving(false);
        alert('저장되었습니다.');
    };

    // --- Schedule Handlers ---
    const handleUpdateSchedule = (track, index, field, value) => {
        let finalValue = value;
        if (field === 'image' && value.includes('drive.google.com')) {
            finalValue = convertGoogleDriveLink(value);
        }
        updateSchedule(track, index, field, finalValue);
    };

    const handleSaveSchedules = () => {
        saveSchedule();
        alert('저장되었습니다.');
    };

    if (newsLoading || instructorsLoading) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-slate-500 font-bold">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-800">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">Web3 Academy</span>
                    <h1 className="text-2xl font-black">Admin</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {[
                        { id: 'news', label: '뉴스 관리' },
                        { id: 'schedule', label: '일정 관리' },
                        { id: 'instructors', label: '교관 관리' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full text-left px-4 py-3 rounded-lg font-bold transition ${activeTab === tab.id ? 'bg-primary text-white' : 'text-slate-400 hover:bg-slate-800'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-800">
                    <button onClick={handleLogout} className="flex items-center gap-2 text-slate-400 hover:text-white font-bold transition w-full px-4 py-2">
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {/* Mobile Header */}
                <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-20">
                    <span className="font-bold">Admin Panel</span>
                    <button onClick={handleLogout}><LogOut size={18} /></button>
                </div>
                <div className="md:hidden bg-white border-b overflow-x-auto whitespace-nowrap p-2 sticky top-14 z-20">
                    {[
                        { id: 'news', label: '뉴스' },
                        { id: 'schedule', label: '일정' },
                        { id: 'instructors', label: '교관' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-full font-bold text-sm mr-2 transition ${activeTab === tab.id ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600'}`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="p-6 md:p-10 max-w-5xl mx-auto">
                    {/* --- NEWS SECTION --- */}
                    {activeTab === 'news' && (
                        <div>
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-black text-slate-900">뉴스 관리</h2>
                                {!editingNews && (
                                    <button onClick={() => setEditingNews({})} className="bg-primary text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg hover:bg-red-700 transition">
                                        <Plus size={18} /> 뉴스 추가
                                    </button>
                                )}
                            </div>

                            {editingNews ? (
                                <div className="bg-white p-8 rounded-2xl shadow-xl">
                                    <h3 className="text-xl font-bold mb-6">{editingNews.id ? '뉴스 수정' : '새 뉴스 작성'}</h3>
                                    <form onSubmit={saveNews} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="label-text">제목</label>
                                                <input name="title" required defaultValue={editingNews.title} className="input-field" placeholder="제목을 입력하세요" />
                                            </div>
                                            <div>
                                                <label className="label-text">카테고리</label>
                                                <input name="category" required defaultValue={editingNews.category || '공지사항'} className="input-field" placeholder="예: 공지사항, 특강, 이벤트" />
                                            </div>
                                            <div>
                                                <label className="label-text">날짜</label>
                                                <input type="date" name="date" required defaultValue={editingNews.date} className="input-field" />
                                            </div>
                                            <div>
                                                <label className="label-text">이미지</label>
                                                <ImageUpload
                                                    value={editingNews.image || ''}
                                                    onChange={(url) => setEditingNews({ ...editingNews, image: url })}
                                                />
                                                <input type="hidden" name="image" value={editingNews.image || ''} />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="label-text">내용</label>
                                            <textarea name="content" required defaultValue={editingNews.content} rows={10} className="input-field" placeholder="내용을 입력하세요"></textarea>
                                        </div>
                                        <div className="flex justify-end gap-4">
                                            <button type="button" onClick={() => setEditingNews(null)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition">취소</button>
                                            <button type="submit" disabled={saving} className="px-6 py-3 rounded-xl font-bold bg-primary text-white hover:bg-red-700 disabled:bg-gray-400 transition shadow-lg">
                                                {saving ? '저장 중...' : '저장하기'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    {news.map(item => (
                                        <div key={item.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center group hover:shadow-md transition">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs font-bold text-primary bg-red-50 px-2 py-0.5 rounded">{item.category}</span>
                                                    <span className="text-xs text-slate-400">{item.date}</span>
                                                </div>
                                                <h4 className="font-bold text-slate-900">{item.title}</h4>
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => setEditingNews(item)} className="p-2 text-slate-400 hover:text-blue-500 transition"><Edit size={18} /></button>
                                                <button onClick={() => handleDeleteNews(item.id)} className="p-2 text-slate-400 hover:text-red-500 transition"><Trash size={18} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* --- SCHEDULE SECTION --- */}
                    {activeTab === 'schedule' && (
                        <div>
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-black text-slate-900">일정 관리</h2>
                                <button onClick={handleSaveSchedules} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg hover:bg-blue-700 transition">
                                    <Save size={18} /> 변경사항 저장
                                </button>
                            </div>

                            <div className="flex justify-start mb-8">
                                <div className="bg-white p-1 rounded-lg shadow-sm border border-slate-200 inline-flex">
                                    {[
                                        { id: 'basic', label: '기초훈련반' },
                                        { id: 'intermediate', label: '생도육성반' },
                                        { id: 'master', label: '장교육성반' }
                                    ].map(track => (
                                        <button
                                            key={track.id}
                                            onClick={() => setActiveScheduleTrack(track.id)}
                                            className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${activeScheduleTrack === track.id ? 'bg-slate-900 text-white shadow' : 'text-slate-500 hover:text-slate-900'}`}
                                        >
                                            {track.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-8">
                                {(schedule?.[activeScheduleTrack] || []).map((sch, schIdx) => (
                                    <div key={sch.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                        <h3 className="text-xl font-bold text-slate-900 mb-6 border-b pb-4">{sch.month} 설정</h3>
                                        <div className="mb-6">
                                            <label className="label-text">시간표 이미지</label>
                                            <ImageUpload
                                                value={sch.image || ''}
                                                onChange={(url) => handleUpdateSchedule(activeScheduleTrack, schIdx, 'image', url)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* --- INSTRUCTORS SECTION --- */}
                    {activeTab === 'instructors' && (
                        <div>
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-black text-slate-900">교관 관리</h2>
                                <button onClick={handleSaveInstructors} disabled={saving} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg hover:bg-blue-700 disabled:bg-gray-400 transition">
                                    <Save size={18} /> {saving ? '저장 중...' : '변경사항 저장'}
                                </button>
                            </div>

                            <div className="space-y-8">
                                {instructors.map((inst) => (
                                    <div key={inst.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                        <div className="flex flex-col md:flex-row gap-8 mb-6 border-b border-gray-100 pb-6">
                                            <div className="shrink-0 flex justify-center md:justify-start">
                                                <img src={convertGoogleDriveLink(inst.image)} className="w-32 h-32 rounded-2xl object-cover shadow-sm" />
                                            </div>
                                            <div className="flex-1 space-y-4">
                                                <div>
                                                    <label className="text-xs font-bold text-slate-400 block mb-1">교관명</label>
                                                    <input
                                                        value={inst.name || ''}
                                                        onChange={(e) => handleUpdateInstructor(inst.id, 'name', e.target.value)}
                                                        className="font-black text-2xl text-slate-900 w-full outline-none border-b border-dashed border-gray-200 focus:border-primary py-2 transition"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-slate-400 block mb-1">직함</label>
                                                    <input
                                                        value={inst.title || ''}
                                                        onChange={(e) => handleUpdateInstructor(inst.id, 'title', e.target.value)}
                                                        className="text-lg text-primary font-bold w-full outline-none border-b border-dashed border-gray-200 focus:border-primary py-1 transition"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <div>
                                                <label className="label-text text-base">교관 이미지</label>
                                                <ImageUpload
                                                    value={inst.image || ''}
                                                    onChange={(url) => handleUpdateInstructor(inst.id, 'image', url)}
                                                />
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-8 items-start">
                                                <div>
                                                    <label className="label-text text-base">교육 철학</label>
                                                    <textarea
                                                        value={inst.philosophy || ''}
                                                        onChange={(e) => handleUpdateInstructor(inst.id, 'philosophy', e.target.value)}
                                                        className="input-field text-lg font-medium leading-relaxed h-[240px]"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="label-text text-base">경력 및 소개</label>
                                                    <textarea
                                                        value={inst.bio || ''}
                                                        onChange={(e) => handleUpdateInstructor(inst.id, 'bio', e.target.value)}
                                                        className="input-field text-base leading-relaxed h-[240px]"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <style>{`
        .label-text { @apply block text-sm font-bold text-slate-700 mb-2; }
        .input-field { @apply w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition bg-slate-50 focus:bg-white; }
      `}</style>
        </div>
    );
}
