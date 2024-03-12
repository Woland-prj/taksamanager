import { TConfirmedUser, TUnidentifiedUser } from "@/types/user";

export const getUserFromDb = async (user: TUnidentifiedUser, confirmedUser: TConfirmedUser) => {
  const exampleData: TConfirmedUser = {id: 'id', profileId: 'profileId',
    	username: 'username', email: 'email@example.com'}
    async function postJSONWithUnidetifiedUser(unidentifiedUser: TUnidentifiedUser) {
        try {
          const response = await fetch("localhost:3200/api/v1/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(unidentifiedUser),
          });
      
          const result = await response.json();
          console.log("Success:", result);
        } catch (error) {
          console.error("Error:", error)
        }
    }
    async function getConfirmedUserObject(user: TConfirmedUser) {
      try {
        const response = await fetch("localhost:3200/api/v1/users")
        if (response.status == 201) {
          user = await response.json()
          console.log("Success:", user)
        }
        if (response.status == 409) {}
      } catch (error) {
        console.error("Error:", error)
      }
    }
    postJSONWithUnidetifiedUser(user)
    getConfirmedUserObject(confirmedUser)
}