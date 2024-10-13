import { MongoClient } from 'mongodb';

const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || 27017;
const DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${HOST}:${PORT}`;

class DBClient {
  constructor() {
    this.client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });
    this.db = null;
    this.connectionPromise = this.connect();
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(DATABASE);
      console.log('Connected successfully to MongoDB server');
    } catch (err) {
      console.error('Failed to connect to MongoDB:', err.message);
    }
  }

  async isAlive() {
    try {
      await this.connectionPromise;
      return this.client.isConnected();
    } catch (err) {
      return false;
    }
  }

  async nbUsers() {
    await this.connectionPromise;
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    const users = this.db.collection('users');
    return users.countDocuments();
  }

  async nbFiles() {
    await this.connectionPromise;
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    const files = this.db.collection('files');
    return files.countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
