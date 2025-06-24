import { Request, Response } from "express";
import { GenerateContent } from "./Aifunctions";

interface RequestNew extends Request {
  userId: string;
}

export async function generateCalender(req: RequestNew, res: Response) {
  const { brandName, platform, tone, targetAudience } = req.body;
  const userId = req.userId;
  try {
    const response = await GenerateContent({
      brandName,
      platform,
      tone,
      targetAudience,
    });
  } catch (error) {}
}
