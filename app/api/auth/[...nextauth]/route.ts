import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import dbConnect from "@/lib/db";
import Users from "@/models/Users";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
  async signIn({ user }) {
    await dbConnect();

    const existingUser = await Users.findOne({ email: user.email });

    if (!existingUser) {
      await Users.create({
        name: user.name,
        email: user.email,
        image: user.image,
      });
    }

    return true;
  },
}
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
