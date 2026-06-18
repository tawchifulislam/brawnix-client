import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('brawnix_db');

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  user: {
    modelName: 'users',
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'user',
      },
      status: {
        type: 'string',
        defaultValue: 'active',
      },
      trainerStatus: {
        type: 'string',
        defaultValue: 'null',
      },
    },
  },
});
