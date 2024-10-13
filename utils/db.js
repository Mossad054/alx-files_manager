import { MongoClient } from 'mongodb';

// DBClient class handles database connections and queries
class DBClient {
  // Constructor initializes the connection to the database
  constructor() {
    // Set the host, port, and database name using environment variables
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // Create the MongoDB connection URL
    const dbURL = `mongodb://${host}:${port}/${database}`;

    // Create a MongoClient instance and connect to the MongoDB server
    this.client = new MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect();
  }

  // Check if the database connection is alive
  isAlive() {
    return this.client.isConnected();
  }

  // Get the number of users in the 'users' collection
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  // Get the number of files in the 'files' collection
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }
}

// Instantiate DBClient and export it for use in other files
const dbClient = new DBClient();
export default dbClient;

