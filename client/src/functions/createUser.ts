import { TNewUser, TConfirmedNewUser } from "@/types/login_and_register";

export const createUser = async (user: TNewUser): Promise<TConfirmedNewUser> => {
    const err409 = '409: User with this email already exists.'
    const err400 = '400: [ "email must be an email" | "password should not be empty" | "username should not be empty" ]'

    async function postJSONWithLoggingInUser(newUser: TNewUser) {
        try {
          const response = await fetch("http://localhost:3200/api/v1/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          });
      
          const result = await response.json();
          console.log("Success:", result);
        } catch (error) {
          console.error("Error:", error)
        }
    }
    async function getJWTResponse(): Promise<TConfirmedNewUser> {
      try {
        const response = await fetch("http://localhost:3200/api/v1/auth/login")
        if (response.status == 201) {
          console.log("Success:", response.status) 
        }
        if (response.status == 409) {throw new Error(err409)}
        if (response.status == 400) {throw new Error(err400)}
      } catch (error) {
        console.error("Error:", error)
        if(error == err409) {
          console.log(err409)
        }
        if(error == err400) {
          console.log(err400)
        }
      }
    }
    postJSONWithLoggingInUser(user)

    return await getJWTResponse()
}