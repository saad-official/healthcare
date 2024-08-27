import * as sdk from "node-appwrite";
export const {
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  NEXT_PUBLIC_ENDPOINT
} = process.env;

const client = new sdk.Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('668be9370039173be565').setKey('83764e48899160a4f3af643a391f98a25b38349b8128e016c8fe64b1b0acb3b68fb81e4c071aea98932aca4fd615a273b8e98d2c88fa228d6618ee416ca8d385a36fb5f5125b127c8d1f1731f2148455dacb24b5aa8780197dd88d805e921a0efa8e4aba90435225b3f89bfe91aadd7c5360ef95305688eaefe1267f03e736db');

export const databases = new sdk.Databases(client);
export const storgae = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);