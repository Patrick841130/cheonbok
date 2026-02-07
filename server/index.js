import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth.js';
import apiRoutes from './routes/api.js';
import uploadRoutes from './routes/upload.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// ===================
// SECURITY: CORS Configuration
// ===================
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            callback(new Error('CORS 정책에 의해 차단되었습니다.'));
        }
    },
    credentials: true
}));

// ===================
// SECURITY: Rate Limiting
// ===================
// General API rate limiter: 100 requests per 15 minutes
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: { error: '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Strict rate limiter for auth: 5 attempts per 15 minutes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: { error: '로그인 시도가 너무 많습니다. 15분 후에 다시 시도해주세요.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// ===================
// SECURITY: Security Headers
// ===================
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

app.use(express.json({ limit: '10mb' }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===================
// ROUTES
// ===================
// Auth routes with strict rate limiting
app.use('/api/auth', authLimiter, authRoutes);

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

// Protected API routes with general rate limiting
app.use('/api', generalLimiter, authenticateToken, apiRoutes);
app.use('/api/upload', generalLimiter, authenticateToken, uploadRoutes);

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
    if (err.message && err.message.includes('CORS')) {
        return res.status(403).json({ error: err.message });
    }
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
});

app.listen(PORT, () => {
    console.log(`🚀 Cheonbok API Server running on port ${PORT}`);
    console.log(`   Health check: http://localhost:${PORT}/health`);
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
});
