import { getMessage } from "../../services/messages.mjs";
import { sendResponse } from "../../responses/index.mjs";

export const handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    const message = await getMessage(id);

    if (!message) {
      return sendResponse(404, { message: "Message not found" });
    }

    return sendResponse(200, message);
  } catch (err) {
    console.error("Error in getMessageById:", err);
    return sendResponse(500, { message: "Could not fetch message" });
  }
};
