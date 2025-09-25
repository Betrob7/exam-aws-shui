import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { sendResponse } from "../../responses/index.mjs";
import { getMessage, updateMessage } from "../../services/messages.mjs";
import { errorHandler } from "../../middlewares/errorHandler.mjs";
import { authMiddleware } from "../../middlewares/validateAuth.mjs";

export const handler = middy(async (event) => {
  console.log("PATCH event:", event); // 👈 logga hela eventet

  const { id } = event.pathParameters;
  const { text } = event.body;

  console.log("Update request for id:", id, "with text:", text); // 👈 logga values

  const message = await getMessage(id);

  if (!message) {
    return sendResponse(404, { message: "Message not found" });
  }

  if (message.username !== event.user.username) {
    return sendResponse(403, { message: "Not allowed to edit this message" });
  }

  const updated = await updateMessage(id, text);
  console.log("Updated message:", updated);

  return sendResponse(200, updated);
})
  .use(httpJsonBodyParser())
  .use(authMiddleware())
  .use(errorHandler());
