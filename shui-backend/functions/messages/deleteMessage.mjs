import middy from "@middy/core";
import { sendResponse } from "../../responses/index.mjs";
import { getMessage, deleteMessage } from "../../services/messages.mjs";
import { errorHandler } from "../../middlewares/errorHandler.mjs";
import { authMiddleware } from "../../middlewares/validateAuth.mjs";

export const handler = middy(async (event) => {
  const { id } = event.pathParameters;

  const message = await getMessage(id);

  if (!message) {
    return sendResponse(404, { message: "Message not found" });
  }

  if (message.username !== event.user.username) {
    return sendResponse(403, { message: "Not allowed to delete this message" });
  }

  await deleteMessage(id);

  return sendResponse(200, { success: true, message: "Message deleted" });
})
  .use(authMiddleware()) // kräver login
  .use(errorHandler());
