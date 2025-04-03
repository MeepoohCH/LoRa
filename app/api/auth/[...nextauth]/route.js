import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

const authOptions = {
    providers: [
        CredentialsProvider({
          name: 'credentials',
          credentials: {},
          async authorize(credentials, req) {

            const {email, password} = credentials;

            try{

                await connectMongoDB();
                const user = await User.findOne({ email });

                if (!user) {
                    return null;
                }

                const passwordMatch = await bcrypt.compare(password, user.password);

                if (!passwordMatch) {
                    return null;
                }

                return { id: user.id, name: user.name, email: user.email, role: user.role };

            }catch(error){
                console.log("Error: ",error)
            }
            
    
          }
        })
      ],
      session: {
        strategy: "jwt",
      },

      callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role; // เพิ่ม role ใน JWT
            }
            console.log("JWT Callback: ", token);
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role; // ให้ session มี role ด้วย
            }
            console.log("Session Callback: ", session);
            return session;
        }
    },


      secret: process.env.NEXTAUTH_SECRET,
      pages: {
        signIn: "/login"
      }
}

    const handler = NextAuth(authOptions);
    export { handler as GET, handler as POST };