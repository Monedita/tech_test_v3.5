import app from "./app";
import config from "./config";
import { closeDatabaseConnection, connectToDatabase } from "./providers/postgres.provider";

const PORT: number = config.port;

const startServer = async () => {
  try {
    await connectToDatabase();
    console.log('Successfully connected to PostgreSQL');
    
    const server = app.listen(PORT, (): void => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });

    const shutdown = async (): Promise<void> => {
      console.log('Shutting down gracefully...');
      server.close();
      await closeDatabaseConnection();
      process.exit(0);
    };

    process.on('SIGINT', () => void shutdown());
    process.on('SIGTERM', () => void shutdown());

  } catch (error: unknown) {
    console.error('Unable to connect to PostgreSQL', error);
    process.exit(1);
  }
};

void startServer();