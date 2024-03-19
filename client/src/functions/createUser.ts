import { TNewUser, TConfirmedNewUser } from "@/types/login_and_register";

export const createUser = async (user: TNewUser, registeredUser: TConfirmedNewUser) => {
    async function postJSONWithLoggingInUser(newUser: TNewUser) {
        try {
          const response = await fetch("localhost:3200/api/v1/auth/login", {
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
    async function getJWTResponse(registeredUser: TConfirmedNewUser) {
      try {
        const response = await fetch("localhost:3200/api/v1/auth/login")
        if (response.status == 201) {
          registeredUser = await response.json()
          console.log("Success:", registeredUser) 
        }
        if (response.status == 409) {console.error('409: User with this email already exists.')}
        if (response.status == 400) {console.error('400: [ "email must be an email" | "password should not be empty" | "username should not be empty" ]')}
      } catch (error) {
        console.error("Error:", error)
      }
    }
    postJSONWithLoggingInUser(user)
    getJWTResponse(registeredUser)
}