import { MongoClient } from 'mongodb';
import loadEnvironment from '../loadEnvironment.mjs';

const env = loadEnvironment();

const client = new MongoClient(env.db.uri);
let db = null;

export async function connectToDatabase() {
  if (db) return db;
  await client.connect();
  db = client.db(env.db.name);
  console.log(`MongoDB connected -> database: ${db.databaseName}`);
  return db;
}

export function getDb() {
  if (!db) throw new Error('Database not connected yet');
  return db;
}