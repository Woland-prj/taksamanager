import { TJWTResponse, TLoggingInUser } from "@/types/login_and_register";

export const getTokensFromDb = async (user: TLoggingInUser, JWT: TJWTResponse) => {
    async function postJSONWithLoggingInUser(loggingInUser: TLoggingInUser) {
        try {
          const response = await fetch("localhost:3200/api/v1/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loggingInUser),
          });
      
          const result = await response.json();
          console.log("Success:", result);
        } catch (error) {
          console.error("Error:", error)
        }
    }
    async function getJWTResponse(JWT: TJWTResponse) {
      try {
        const response = await fetch("localhost:3200/api/v1/auth/login")
        if (response.status == 201) {
          JWT = await response.json()
          console.log("Success:", JWT) // !!! Убрать лог JWT после тестов !!!
        }
        if (response.status == 401) { console.error('401 Unauthorised') }
      } catch (error) {
        console.error("Error:", error)
      }
    }
    postJSONWithLoggingInUser(user)
    getJWTResponse(JWT)
}