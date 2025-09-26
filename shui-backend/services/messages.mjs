import { client } from "./client.mjs";
import { PutItemCommand, GetItemCommand, ScanCommand, DeleteItemCommand, UpdateItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

const TABLE_NAME = "shui-table";

// 🔹 Hämta alla meddelanden
export const getAllMessages = async () => {
  const command = new ScanCommand({
    TableName: TABLE_NAME,
    FilterExpression: "begins_with(PK, :prefix)",
    ExpressionAttributeValues: {
      ":prefix": { S: "MESSAGE#" },
    },
  });

  const result = await client.send(command);

  // gör om till vanliga JS-objekt
  return result.Items.map((item) => unmarshall(item));
};

// 🔹 Lägg till nytt meddelande
// 🔹 Lägg till nytt meddelande
export const addMessage = async (message) => {
  const createdAt = new Date().toISOString();

  const item = {
    PK: `MESSAGE#${message.id}`,
    SK: "PROFILE",
    id: message.id,
    username: message.username,
    text: message.text,
    createdAt,

    // 🔑 extra för GSI (så vi kan query:a på användare)
    GSI1PK: `USER#${message.username}`,
    GSI1SK: createdAt,
  };

  const command = new PutItemCommand({
    TableName: TABLE_NAME,
    Item: marshall(item),
  });

  await client.send(command);
  return item;
};

// 🔹 Hämta ett specifikt meddelande
export const getMessage = async (id) => {
  const command = new GetItemCommand({
    TableName: TABLE_NAME,
    Key: marshall({
      PK: `MESSAGE#${id}`,
      SK: "PROFILE",
    }),
  });

  const { Item } = await client.send(command);
  return Item ? unmarshall(Item) : null;
};

// 🔹 Ta bort ett meddelande
export const deleteMessage = async (id) => {
  const command = new DeleteItemCommand({
    TableName: TABLE_NAME,
    Key: marshall({
      PK: `MESSAGE#${id}`,
      SK: "PROFILE",
    }),
  });

  await client.send(command);
  return true;
};

// 🔹 Uppdatera ett meddelande (bara text i detta exempel)
export const updateMessage = async (id, newText) => {
  const command = new UpdateItemCommand({
    TableName: TABLE_NAME,
    Key: marshall({
      PK: `MESSAGE#${id}`,
      SK: "PROFILE",
    }),
    UpdateExpression: "SET #text = :text",
    ExpressionAttributeNames: { "#text": "text" },
    ExpressionAttributeValues: {
      ":text": { S: newText }, // <-- FIX här
    },
    ReturnValues: "ALL_NEW",
  });

  const result = await client.send(command);
  return unmarshall(result.Attributes);
};

// 🔹 Hämta alla meddelanden för en användare
export const getMessagesByUser = async (username) => {
  const command = new QueryCommand({
    TableName: TABLE_NAME,
    IndexName: "GSI1", // använder indexet från serverless.yml
    KeyConditionExpression: "GSI1PK = :user",
    ExpressionAttributeValues: {
      ":user": { S: `USER#${username}` },
    },
  });

  const result = await client.send(command);
  return result.Items.map((item) => unmarshall(item));
};
