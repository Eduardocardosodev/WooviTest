import { app, startRouteKoa } from './koa';
import { startApolloServer, connectDb } from './graphql';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServers() {
  try {
    const dbConnected = await connectDb();
    if (dbConnected) {
      // Configurar rotas REST
      await startRouteKoa();

      // Iniciar Apollo Server e adicionar suas rotas ao mesmo aplicativo Koa
      await startApolloServer(app);

      // Iniciar o servidor
      app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
        console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
        console.log(`GraphQL Playground: http://localhost:${PORT}/playground`);
      });
    } else {
      console.error('Failed to connect to MongoDB. Exiting...');
    }
  } catch (error) {
    console.error('Error starting servers:', error);
  }
}

startServers();
