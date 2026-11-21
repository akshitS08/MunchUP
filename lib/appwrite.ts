import {
  Account,
  AppwriteException,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";
import { CreateUserParams, LogInParams } from "../type";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
  platform: "com.akshit.munchup",
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!,
  userTableId: process.env.EXPO_PUBLIC_APPWRITE_USERS_TABLE_ID!,
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
const avatar = new Avatars(client);

// Get the currently authenticated account
export const getActiveAccount = async () => {
  try {
    return await account.get();
  } catch (error) {
    if (error instanceof AppwriteException && error.code === 401) {
      return null;
    }

    throw error;
  }
};

// Register a new user
export const createUser = async ({
  name,
  email,
  password,
}: CreateUserParams) => {
  const activeAccount = await getActiveAccount();

  if (activeAccount) {
    throw new Error("Please log out before signing up.");
  }

  const newAccount = await account.create(ID.unique(), email, password, name);

  await account.createEmailPasswordSession(email, password); // !Login session after creating the account

  const avatarUrl = avatar.getInitialsURL(name);

  return databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.userTableId,
    ID.unique(),
    {
      email,
      name,
      accountId: newAccount.$id,
      avatar: avatarUrl,
    },
  );
};

// Log in an existing user
export const login = async ({ email, password }: LogInParams) => {
  const activeAccount = await getActiveAccount();

  if (activeAccount) {
    throw new Error("Please log out before logging in again.");
  }

  return account.createEmailPasswordSession(email, password);
};

// Log out the current user
export const logout = async () => {
  await account.deleteSession("current");
};

// Get the current user's database profile
export const getCurrentUser = async () => {
  try {
    const currentAccount = await getActiveAccount();

    if (!currentAccount) return null;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userTableId,
      [Query.equal("accountId", currentAccount.$id)],
    );

    if (!currentUser.documents.length) return null;

    return currentUser.documents[0] ?? null;
  } catch (error) {
    console.log(error);

    throw error;
  }
};
