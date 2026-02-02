import express from 'express';
import db from '../db.js';

const router = express.Router();

// =====================
// NEWS CRUD
// =====================
router.get('/news', (req, res) => {
    const rows = db.prepare('SELECT * FROM news ORDER BY created_at DESC').all();
    res.json(rows);
});

router.post('/news', (req, res) => {
    const { title, summary, link } = req.body;
    const result = db.prepare('INSERT INTO news (title, summary, link) VALUES (?, ?, ?)').run(title, summary, link);
    res.json({ id: result.lastInsertRowid, title, summary, link });
});

router.put('/news/:id', (req, res) => {
    const { title, summary, link } = req.body;
    db.prepare('UPDATE news SET title = ?, summary = ?, link = ? WHERE id = ?').run(title, summary, link, req.params.id);
    res.json({ id: parseInt(req.params.id), title, summary, link });
});

router.delete('/news/:id', (req, res) => {
    db.prepare('DELETE FROM news WHERE id = ?').run(req.params.id);
    res.json({ success: true });
});

// =====================
// SCHEDULE CRUD
// =====================
router.get('/schedule', (req, res) => {
    const rows = db.prepare('SELECT * FROM schedule ORDER BY date ASC').all();
    res.json(rows);
});

router.post('/schedule', (req, res) => {
    const { date, title, description } = req.body;
    const result = db.prepare('INSERT INTO schedule (date, title, description) VALUES (?, ?, ?)').run(date, title, description);
    res.json({ id: result.lastInsertRowid, date, title, description });
});

router.put('/schedule/:id', (req, res) => {
    const { date, title, description } = req.body;
    db.prepare('UPDATE schedule SET date = ?, title = ?, description = ? WHERE id = ?').run(date, title, description, req.params.id);
    res.json({ id: parseInt(req.params.id), date, title, description });
});

router.delete('/schedule/:id', (req, res) => {
    db.prepare('DELETE FROM schedule WHERE id = ?').run(req.params.id);
    res.json({ success: true });
});

// =====================
// INSTRUCTORS CRUD
// =====================
router.get('/instructors', (req, res) => {
    const rows = db.prepare('SELECT * FROM instructors ORDER BY id ASC').all();
    res.json(rows);
});

router.post('/instructors', (req, res) => {
    const { name, role, image, philosophy, bio } = req.body;
    const result = db.prepare('INSERT INTO instructors (name, role, image, philosophy, bio) VALUES (?, ?, ?, ?, ?)').run(name, role, image, philosophy, bio);
    res.json({ id: result.lastInsertRowid, name, role, image, philosophy, bio });
});

router.put('/instructors/:id', (req, res) => {
    const { name, role, image, philosophy, bio } = req.body;
    db.prepare('UPDATE instructors SET name = ?, role = ?, image = ?, philosophy = ?, bio = ? WHERE id = ?').run(name, role, image, philosophy, bio, req.params.id);
    res.json({ id: parseInt(req.params.id), name, role, image, philosophy, bio });
});

router.delete('/instructors/:id', (req, res) => {
    db.prepare('DELETE FROM instructors WHERE id = ?').run(req.params.id);
    res.json({ success: true });
});

export default router;
