import { users } from "../appwrite.config";
import { Query, ID } from "node-appwrite";
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
    return user
  } catch (error: any) {
    console.log('err', error)
    if (error && error?.code === 409) { 
      const documents = await users.list([Query.equal("email", [user?.email])]);

      return documents?.users[0];
    }
  }
};
