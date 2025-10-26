import { getAuth } from "@clerk/express";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const shouldBeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { isAuthenticated, userId } = getAuth(req);

  if (!isAuthenticated || !userId) {
    return res.status(401).json({ message: "You are not logged in" });
  }

  req.userId = userId;
  return next();
};
