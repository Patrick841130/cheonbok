import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import { NewsList, NewsDetail } from './pages/News';
import Schedule from './pages/Schedule';
import Instructors from './pages/Instructors';
import Admin from './pages/Admin';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="news" element={<NewsList />} />
        <Route path="news/:id" element={<NewsDetail />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="instructors" element={<Instructors />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin" element={
        <ProtectedRoute>
          <Admin />
        </ProtectedRoute>
      } />
    </Routes>
  );
}
