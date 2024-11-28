import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { auth, handlers, signIn, signOut } = NextAuth({
  session: { strategy: `jwt` },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          label: 'email',
        },
        password: { label: 'password' },
      },
      authorize: async credentials => {
        if (!credentials?.email || !credentials.password) return null
        return {
          id: crypto.randomUUID(),
          name: `user`,
          email: credentials.email,
          image: null,
        }
      },
    }),
  ],
  pages: {
    signIn: `/signin`,
    error: `/signin`,
  },
})
