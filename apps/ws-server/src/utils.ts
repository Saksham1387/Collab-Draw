import { JWT_SECRET } from "common/config";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const verifyUser = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded == "string") {
      return null;
    }

    if (!decoded || !decoded.userId) {
      return null;
    }

    return decoded.userId;
  } catch (e) {
    return null;
  }
  return null;
};
