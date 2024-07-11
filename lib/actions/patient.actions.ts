import { users } from "../appwrite.config";
import { Query, ID } from "node-appwrite";
import { parseStringify } from "../utils";
export const createUser = async (user: CreateUserParams) => {
  try {
    console.log("new user", user)
    const newUser = await users.create(
      ID.unique(),
      user?.email,
      user?.phone,
      undefined,
      user?.name
    );
    console.log("new user", newUser)
    return newUser
  } catch (error: any) {
    console.log('err', error)
    if (error && error?.code === 409) { 
      const documents = await users.list([Query.equal("email", [user?.email])]);

      return documents?.users[0];
    }
  }
};

export const getUser = async (userId:string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.log("error", error)
  }
}