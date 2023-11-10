import { registerAs } from '@nestjs/config';

export default registerAs('cache', () => ({
  cacheTTL: parseInt(process.env.CACHE_TTL) || 3600000, // Default 1 hour
}));
