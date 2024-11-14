export default () => ({
  LOG_LEVEL: 'info',
  port: '3000',
  JWT_SECRET: 'default-secret',
  BASE_URL: 'http://localhost:3000',
  FRONTEND_URL: 'http://localhost:3000',
  GOOGLE_CLIENT_ID:
    '967264246354-orv519f440qqj38fv6m1gb4ppdkn9irv.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: 'wadawd',
  GOOGLE_CALLBACK_URL: 'http://localhost:3000/auth/google/redirect',
  DISCOGS_API_KEY: 'api-key',
  STRIPE_SECRET_KEY: 'your-stripe-secret-key',
  STRIPE_PUBLIC_KEY: 'your-stripe-secret-key',
  DB_HOST: 'localhost',
  DB_PORT: '5432',
  DB_USERNAME: 'root',
  DB_PASSWORD: 'password',
  DB_NAME: 'my_project_db',
});
