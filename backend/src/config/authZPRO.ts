'use strict';

// Define the environment configuration interface
interface EnvConfig {
  secret: string;
  expiresIn: string;
  refreshSecret: string;
  refreshExpiresIn: string;
}

// Extract the environment variables or use default values
const config: EnvConfig = {
  secret: process.env.JWT_SECRET || 'defaultSecretKey12345',
  expiresIn: '2d',
  refreshSecret: process.env.JWT_REFRESH_SECRET || 'defaultRefreshSecretKey12345',
  refreshExpiresIn: '5d',
};

// Export the config object
export default config;
