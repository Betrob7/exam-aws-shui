import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { sendResponse } from "../../responses/index.mjs";
import { validateUser } from "../../middlewares/validateUser.mjs";
import { errorHandler } from "../../middlewares/errorHandler.mjs";
import { addUser } from "../../services/users.mjs";

export const handler = middy(async (event) => {
  const response = await addUser(event.body);
  if (response) {
    return sendResponse(201, { message: "User created successfully" });
  } else {
    return sendResponse(404, { message: "User could not be created" });
  }
})
  .use(httpJsonBodyParser())
  .use(validateUser())
  .use(errorHandler());
