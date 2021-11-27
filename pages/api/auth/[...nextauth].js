import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  session: {
    jwt: true,
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
      user && (token.user = user);
      return Promise.resolve(token);
    },
    session: async (session, user, sessionToken) => {
      session.user = user.user;
      return Promise.resolve(session);
    },
  },
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    }),
    Providers.Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    }),
    Providers.Facebook({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET,
    }),
  ],
  database: process.env.NEXT_PUBLIC_MONGODB_URI,
});
