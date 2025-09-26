import { sendResponse } from "../../responses/index.mjs";
import { getMessagesByUser } from "../../services/messages.mjs";

export const handler = async (event) => {
  try {
    const { username } = event.pathParameters;
    const messages = await getMessagesByUser(username);
    return sendResponse(200, messages);
  } catch (err) {
    console.error("Error in getMessagesByUser:", err);
    return sendResponse(500, { message: "Failed to fetch user messages" });
  }
};
