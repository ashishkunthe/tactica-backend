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

export async function GetCalender(req: RequestNew, res: Response) {
  const userId = req.userId;
  try {
    const calendar = await ContentPlan.findOne({ user: userId });

    res.status(200).json({
      _id: calendar?._id,
      posts: calendar?.posts,
      platform: calendar?.platform,
      tone: calendar?.tone,
      brandName: calendar?.brandName,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went wrong",
    });
  }
}

export async function DeleteCalender(req: RequestNew, res: Response) {
  const userId = req.userId;
  const planId = req.params.planId;

  try {
    const removedCalender = await ContentPlan.findOneAndDelete({
      _id: planId,
      user: userId,
    });

    if (!removedCalender) {
      return res
        .status(404)
        .json({ message: "No calendar found with this ID" });
    }

    return res.status(200).json({
      message: "the content deleted sucessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went wrong",
    });
  }
}
