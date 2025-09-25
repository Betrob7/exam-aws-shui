import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { v4 as uuidv4 } from "uuid";
import { sendResponse } from "../../responses/index.mjs";
import { addMessage } from "../../services/messages.mjs";
import { errorHandler } from "../../middlewares/errorHandler.mjs";
import { authMiddleware } from "../../middlewares/validateAuth.mjs";

export const handler = middy(async (event) => {
  const body = event.body;

  const message = {
    id: uuidv4(),
    username: event.user.username,
    text: body.text,
  };

  const saved = await addMessage(message);

  return sendResponse(201, saved);
})
  .use(httpJsonBodyParser())
  .use(authMiddleware())
  .use(errorHandler());
