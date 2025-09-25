import { getAllMessages } from "../../services/messages.mjs";
import { sendResponse } from "../../responses/index.mjs";

export const handler = async () => {
  try {
    const messages = await getAllMessages();

    // sortera nyaste först
    messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return sendResponse(200, messages);
  } catch (err) {
    console.error("Error in getMessages:", err);
    return sendResponse(500, { message: "Could not fetch messages" });
  }
};
