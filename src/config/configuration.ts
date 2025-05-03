export default () => ({
    port: parseInt(String(process.env.PORT), 10) || 3000,
    database: {
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(String(process.env.DATABASE_PORT), 10) || 3306,
      username: process.env.DATABASE_USER || 'root',
      pass: process.env.DATABASE_PASS || 'root'
    },
  });
