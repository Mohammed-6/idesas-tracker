import { Client, Database, Account } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("https://cloud.appwrite.io/v1");

export const account = new Account();
export const databases = new Database();
