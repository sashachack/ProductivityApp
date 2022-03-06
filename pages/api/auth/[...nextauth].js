import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        },
        profile(profile) {
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.picture,
          }
        },
      })
  ],
  database: process.env.MONGODB_URI,
  jwt: {
      encryption: true,
  },
  secret: process.env.TOKEN_SECRET,
  // callbacks: {
  //   async jwt(token, account) { 
  //     console.log("token: ", token);
  //     console.log("account: ", account);
  //     if (account?.accessToken) {
  //       token.accessToken = account.accessToken;
  //     }
  //     return token;
  //   },
  //   redirect: async (url, _baseUrl) => { 
  //     if (url === '/profile') {
  //       return Promise.resolve('/');
  //     }
  //     return Promise.resolve('/');
  //   },
  // }
});