import { buildSchemaSync } from 'type-graphql';
import { AccountSchema } from './account.schema.graphql';
import { AccountController } from '../controllers/account.controller';
import { UserSchema } from './user.schema.graphql';
import { TransactionSchema } from './transaction.schema.graphql';
import { TransactionController } from '../controllers/transaction.controller';
import AuthSchema from './authenticate.schema.graphql';
import AuthController from '../controllers/authenticate.controller';
import AuthMiddleware from '../middlewares/auth';
const schema = buildSchemaSync({
  resolvers: [
    AccountSchema,
    AccountController,
    UserSchema,
    TransactionSchema,
    TransactionController,
    AuthSchema,
    AuthController,
  ],
  emitSchemaFile: true, // Opcional: gerar um arquivo de esquema GraphQL
  validate: true, // Habilitar validação
  authChecker: AuthMiddleware,
});

export default schema;
