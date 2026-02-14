import { betterAuth } from 'better-auth';

const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || '6F2zmBZwPL5UESEa7HUdOObqu7xPAa4A',
  trustHost: true,
  // Using the database details that match the backend
});

export default auth;