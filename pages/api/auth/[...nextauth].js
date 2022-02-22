import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";


export default NextAuth({
  providers: [
    GoogleProvider({
        clientId: '62085095108-ouvg85njo4i1g5oafoadd5c7fkucu5ur.apps.googleusercontent.com',
        clientSecret: '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',
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
          }
        }
      })
  ],
  jwt: {
      encryption: true,
  },
  secret: process.env.secret,
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@example.com")
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
  }
});