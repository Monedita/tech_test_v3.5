import type { PoolConfig, QueryResult, QueryResultRow } from 'pg';
import { Pool } from 'pg';
import config from '../config';

const poolConfig: PoolConfig = config.database.connectionString
  ? {
      connectionString: config.database.connectionString,
      ssl: config.database.ssl ? { rejectUnauthorized: false } : false,
      max: config.database.max,
      idleTimeoutMillis: config.database.idleTimeoutMillis,
      connectionTimeoutMillis: config.database.connectionTimeoutMillis,
    }
  : {
      host: config.database.host,
      port: config.database.port,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database,
      ssl: config.database.ssl ? { rejectUnauthorized: false } : false,
      max: config.database.max,
      idleTimeoutMillis: config.database.idleTimeoutMillis,
      connectionTimeoutMillis: config.database.connectionTimeoutMillis,
    };

const pool = new Pool(poolConfig);

pool.on('error', (error: Error) => {
  console.error('Unexpected PostgreSQL client error', error);
});

export const query = async <T extends QueryResultRow>(
  text: string,
  params: unknown[] = [],
): Promise<QueryResult<T>> => {
  return pool.query<T>(text, params);
};

export const connectToDatabase = async (): Promise<void> => {
  const client = await pool.connect();

  try {
    await client.query('SELECT 1');
  } finally {
    client.release();
  }
};

export const closeDatabaseConnection = async (): Promise<void> => {
  await pool.end();
};

export default pool;