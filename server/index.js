import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import apiRoutes from './routes/api.js';
import uploadRoutes from './routes/upload.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Public routes
app.use('/api/auth', authRoutes);

// Public read access for news, schedule, instructors (no auth needed for GET)
app.get('/api/news', (req, res, next) => next());
app.get('/api/schedule', (req, res, next) => next());
app.get('/api/instructors', (req, res, next) => next());

// JWT Middleware for protected routes
const authenticateToken = (req, res, next) => {
    // Allow GET requests without authentication (public read access)
    if (req.method === 'GET') {
        return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: '인증이 필요합니다.' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: '유효하지 않은 토큰입니다.' });
    }
};

// Protected API routes
app.use('/api', authenticateToken, apiRoutes);
app.use('/api/upload', authenticateToken, uploadRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling for multer and other errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: '파일 크기가 너무 큽니다. (최대 10MB)' });
    }
    if (err.message && err.message.includes('이미지')) {
        return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
});

app.listen(PORT, () => {
    console.log(`🚀 Cheonbok API Server running on port ${PORT}`);
    console.log(`   Health check: http://localhost:${PORT}/health`);
});
