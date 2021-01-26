// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports =
  process.env.NODE_ENV === 'test'
    ? {
        dialect: 'sqlite',
        storage: 'src/Repositories/db/database.sqlite',
        logging: false,
      }
    : {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mssql',
        schema: process.env.DB_SCHEMA,
        pool: {
          max: 10,
          min: 0,
          idleTimeoutMillis: 30000,
        },
      };
