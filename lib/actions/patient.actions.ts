import { BUCKET_ID, DATABASE_ID, databases, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID, storgae, users } from "../appwrite.config";
import { Query, ID} from "node-appwrite";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";
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

export const registerPatient = async ({identificationDocument, ...patient}: RegisterUserParams) => {
  try {

    let file;

    if(identificationDocument){
      const inputFile = InputFile.fromBuffer(
        identificationDocument.get('blobFile') as Blob,
        identificationDocument?.get('fileName') as string
      )

      file = await storgae.createFile(BUCKET_ID!, ID.unique(), inputFile)
    }

    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),{
        identificationDocumentId:file?.$id || null,
        identificationDocumentUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
          : null,
          ...patient
      }
    )

    return parseStringify(newPatient);
    
  } catch (error) {
    console.log(error)
  }
}

export const getUser = async (userId:string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.log("error", error)
  }
}