const pool = require('./database/pool');

async function testConnection() {
    try {
        console.log('Testing database connection...');
        const [rows] = await pool.query('SELECT 1 as test');
        console.log('✅ Database connection successful:', rows);

        // Test if services table exists
        const [tables] = await pool.query('SHOW TABLES LIKE "services"');
        if (tables.length > 0) {
            console.log('✅ Services table exists');
            const [services] = await pool.query('SELECT COUNT(*) as count FROM services');
            console.log(`✅ Services count: ${services[0].count}`);
        } else {
            console.log('❌ Services table does not exist - run seed.sql');
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        process.exit(1);
    }
}

testConnection();