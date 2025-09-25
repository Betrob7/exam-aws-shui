import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { sendResponse } from "../../responses/index.mjs";
import { validateLogin } from "../../middlewares/validateLogin.mjs";
import { errorHandler } from "../../middlewares/errorHandler.mjs";
import { getUser } from "../../services/users.mjs";
import { comparePasswords } from "../../utils/bcrypt.mjs";
import { generateToken } from "../../utils/jwt.mjs";

export const handler = middy(async (event) => {
  const response = await getUser(event.body.username);
  if (response) {
    if (await comparePasswords(event.body.password, response.password)) {
      const token = generateToken({ username: response.username, role: response.role });

      return sendResponse(200, {
        message: "User logged in successfully",
        role: response.role,
        token: `Bearer ${token}`,
      });
    } else {
      return sendResponse(400, { message: "Wrong password!" });
    }
  } else {
    return sendResponse(404, { message: "User not found" });
  }
})
  .use(httpJsonBodyParser())
  .use(validateLogin())
  .use(errorHandler());
