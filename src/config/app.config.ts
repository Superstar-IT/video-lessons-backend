import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  nodeEnv: process.env.NODE_ENV,
  port: parseInt(process.env.APP_PORT || process.env.PORT, 10) || 5000,
  apiPrefix: process.env.API_PREFIX || 'api/v1/',
  pharmacyMockApiServer: process.env.PHARMACY_MOCK_API_SERVER,
}));
