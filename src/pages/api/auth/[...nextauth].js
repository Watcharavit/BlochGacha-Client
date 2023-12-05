import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
// import GithubProvider from "next-auth/providers/github"


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "my-login",
      name: "User&Pass Login",
      async authorize(credentials, req) {
          /* add function to get user */
        //   console.log(credentials)
        if (!credentials || !credentials.email || !credentials.password) {
            return null;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })

        var data = await res.json();
        const res2 = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/me`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + data.token,
            },
        });
        const data2 = await res2.json();
        const role = data2.data.role;
        console.log(role);

        data['role'] = role;
        console.log(data);
        if (data.success){
            return data
        }
        return null
      },
      credentials: {
        email: { label: "Email", type: "text ", placeholder: "Enter Email" },
        password: { label: "Password", type: "password" },
      },
    }),

  ],
  callbacks:{
    async session({session, token, user}) {
        session.user = token;
        return session;
    },
    async jwt({token, user}) {
        return {...token, ...user};
    },
  },
  
}

export default NextAuth(authOptions)