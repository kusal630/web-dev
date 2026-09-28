import dotenv from 'dotenv';

const loadEnvironment = () => {
  dotenv.config();

  if (!process.env.MONGODB_URI) {
    console.error('Missing MONGODB_URI - check that server/.env exists');
    process.exit(1);
  }

  return {
    port: parseInt(process.env.PORT, 10) || 3000,
    db: {
      uri: process.env.MONGODB_URI,
      name: process.env.DB_NAME || 'blogdb',
    },
  };
};

export default loadEnvironment;