const parseNumber = (value: string | undefined, fallback: number): number => {
    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) ? parsedValue : fallback;
};

const parseBoolean = (value: string | undefined, fallback: boolean): boolean => {
    if (value === undefined) {
        return fallback;
    }

    return value.toLowerCase() === 'true';
};

const config = {
    port: parseNumber(process.env.PORT, 3000),
    database: {
        host: process.env.DB_HOST ?? 'localhost',
        port: parseNumber(process.env.DB_PORT, 5432),
        user: process.env.DB_USER ?? 'demo_user',
        password: process.env.DB_PASSWORD ?? 'demo_pass',
        database: process.env.DB_NAME ?? 'demo_db',
        ssl: parseBoolean(process.env.DB_SSL, false),
        max: parseNumber(process.env.DB_POOL_MAX, 10),
        idleTimeoutMillis: parseNumber(process.env.DB_IDLE_TIMEOUT_MS, 10000),
        connectionTimeoutMillis: parseNumber(process.env.DB_CONNECTION_TIMEOUT_MS, 5000),
        connectionString: process.env.DATABASE_URL,
    },
};

export default config;