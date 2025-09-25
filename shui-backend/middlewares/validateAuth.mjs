import { verifyToken } from "../utils/jwt.mjs";
import { sendResponse } from "../responses/index.mjs";

export const authMiddleware = () => ({
  before: async (handler) => {
    const authHeader = handler.event.headers?.Authorization || handler.event.headers?.authorization;
    if (!authHeader) {
      return sendResponse(401, { message: "Missing Authorization header" });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = verifyToken(token);

    if (!decoded) {
      return sendResponse(401, { message: "Invalid or expired token" });
    }

    handler.event.user = decoded; // nu kan du komma åt event.user.username
  },
});
