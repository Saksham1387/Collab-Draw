import { type NextFunction, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "common/config";

export const middleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.cookies)
  const token = req.cookies.token;
  console.log(token)
  if(!token){
    res.status(403).json({
      message: "no auth header found",
    });
    return 
  }
  const decode = jwt.verify(token, JWT_SECRET);
  if (decode) {
    //@ts-ignore
    req.userId = decode.userId;
    next();
  } else {
    res.status(403).json({
      message: "unauthorized",
    });
  }
};
