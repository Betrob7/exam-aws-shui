import { hashPassword } from "../utils/bcrypt.mjs";
import { client } from "./client.mjs";
import { PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

export const addUser = async (user) => {
  if (!user || !user.username) {
    console.log("addUser called with invalid user:", user);
    return false;
  }

  const item = {
    PK: `USER#${user.username}`,
    SK: "PROFILE",
    username: user.username,
    password: await hashPassword(user.password),
    email: user.email,
    role: "USER", // eller ta bort helt
  };

  const command = new PutItemCommand({
    TableName: "shui-table",
    Item: marshall(item),
  });

  try {
    await client.send(command);
    return true;
  } catch (error) {
    console.log("ERROR in db:", error.message);
    return false;
  }
};

export const getUser = async (username) => {
  if (!username) return false;

  const command = new GetItemCommand({
    TableName: "shui-table",
    Key: marshall({
      PK: `USER#${username}`,
      SK: "PROFILE",
    }),
  });

  try {
    const { Item } = await client.send(command);
    if (!Item) return false;

    return unmarshall(Item);
  } catch (error) {
    console.log("ERROR in db:", error.message);
    return false;
  }
};
