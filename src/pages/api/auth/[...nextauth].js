import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
// import GithubProvider from "next-auth/providers/github"


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "my-login",
      name: "MyLogin",
      async authorize(credentials, req) {
          /* add function to get user */
        //   console.log(credentials)
        if (!credentials || !credentials.email || !credentials.password) {
            return null;
        }
        // console.log(req)
        const res = await fetch('http://localhost:5400/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        const data = await res.json()

        // console.log(data)

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
    // CredentialsProvider({
    //   id: "intranet-credentials",
    //   name: "Two Factor Auth",
    //   async authorize(credentials, req) {
    //     const user = {
    //       /* add function to get user */
    //     }
    //     return user
    //   },
    //   credentials: {
    //     username: { label: "Username", type: "text ", placeholder: "jsmith" },
    //     "2fa-key": { label: "2FA Key" },
    //   },
    // }),
    /* ... additional providers ... /*/
  ]
}

export default NextAuth(authOptions)