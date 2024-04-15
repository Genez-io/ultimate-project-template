export const port = process.env.PORT || 8080;
export const secureMode = process.env.SECURE_MODE || false;
export const secret =
  process.env.SECRET ||
  "lakikihdgdfdjjjdgd67264664vdjhjdyncmxuei8336%%^#%gdvdhj????jjhdghduue";
export const mongoURL = process.env.MONGO_URL || "mongodb://127.0.0.1/";
export const noFrontendCaching = process.env.NO_CACHE || "yes";
export const frontendCacheExpiry = process.env.FRONTEND_CACHE_EXPIRY || "90";
export const backendCacheExpiry = process.env.BACKEND_CACHE_EXPIRY || "90";
export const rateLimit = process.env.RATE_LIMIT || "1800";
export const rateLimitExpiry = process.env.RATE_LIMIT_EXPIRY || "3600000";
export const postgresURL =
  process.env.POSTGRES_URL || "postgres://127.0.0.1:6379/1";
export const maxContentLength = process.env.MAX_CONTENT_LENGTH || "9999";
export const cleanUpFailedJobs = process.env.CLEANUP_FAILED_JOBS || "yes";
