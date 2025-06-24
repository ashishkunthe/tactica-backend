import { Request, Response } from "express";
import { GenerateContent } from "./Aifunctions";
import ContentPlan from "../models/contentPlan";

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
    const contentPlan = await ContentPlan.create({
      user: userId,
      brandName: brandName,
      platform: platform,
      tone: tone,
      posts: response,
    });
    res.status(200).json({
      message: "the content plan has generated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went wrong ",
    });
  }
}
