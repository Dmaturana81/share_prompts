import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'
import User from "@models/user";
import { connecToDB } from "@utils/database";


const handler = NextAuth(
    {
        providers: [
            GoogleProvider({
                clientId: process.env.GOOGLE_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            })
        ],
        callbacks: {
            async session({ session }) {
                // await connecToDB()
                
                let sessionUser = await User.findOne({
                    email: session.user.email
                })
                if (!sessionUser) {
                    await User.create({
                      email: session.user.email,
                      username: session.user.name.replace(" ", "").toLowerCase(),
                      image: session.user.image,
                    });
                    sessionUser = await User.findOne({
                        email: session.user.email
                    })
                  }
                session.user.id = sessionUser._id.toString();
                return session;
            },
            async singIn({ profile }) {
                try {
                    await connecToDB()
    
                    const userExists = await User.findOne({
                        email: profile.email,
                    });
                    if(!userExists){
                        await User.create({
                            email: profile.email,
                            username: profile.username.replace(" ", "").toLowerCase(),
                            image: profile.picture
                        })
                    }
                } catch (error) {
    
                }
            },  
        }


    }
)

export { handler as GET, handler as POST };