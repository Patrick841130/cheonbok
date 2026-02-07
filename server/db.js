import pg from 'pg';
import bcrypt from 'bcryptjs';

const { Pool } = pg;

// PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Initialize tables
async function initializeDatabase() {
  const client = await pool.connect();
  try {
    await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS news (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                category TEXT,
                date TEXT,
                image TEXT,
                content TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS schedule (
                id SERIAL PRIMARY KEY,
                track TEXT NOT NULL,
                month TEXT NOT NULL,
                image TEXT,
                weeks JSONB DEFAULT '[]',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS instructors (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                title TEXT,
                image TEXT,
                philosophy TEXT,
                bio TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

    // Seed default admin user if not exists
    const result = await client.query('SELECT id FROM users WHERE username = $1', ['admin']);
    if (result.rows.length === 0) {
      // Use environment variable for default password, fallback only for initial setup
      const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD;
      if (!defaultPassword) {
        console.warn('⚠️  WARNING: DEFAULT_ADMIN_PASSWORD not set. Skipping admin user creation.');
        console.warn('   Set DEFAULT_ADMIN_PASSWORD environment variable to create admin user.');
      } else {
        const hashedPassword = bcrypt.hashSync(defaultPassword, 12);
        await client.query('INSERT INTO users (username, password) VALUES ($1, $2)', ['admin', hashedPassword]);
        console.log('✅ Default admin user created.');
      }
    }

    console.log('Database initialized successfully.');
  } catch (err) {
    console.error('Error initializing database:', err);
    throw err;
  } finally {
    client.release();
  }
}

// Initialize on startup
initializeDatabase().catch(console.error);

export default pool;
