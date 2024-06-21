import { app } from './koa';
import { startApolloServer, connectDb } from './graphql';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

async function startServers() {
  try {
    const dbConnected = await connectDb();
    if (dbConnected) {
      await startApolloServer(app);
      app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
        console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
      });
    } else {
      console.error('Failed to connect to MongoDB. Exiting...');
    }
  } catch (error) {
    console.error('Error starting servers:', error);
  }
}

startServers();
