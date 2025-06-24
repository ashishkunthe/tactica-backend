// @ts-ignore
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

interface Props {
  brandName: string;
  platform: string;
  tone: string;
  targetAudience: string;
}

export async function GenerateContent({
  brandName,
  platform,
  tone,
  targetAudience,
}: Props) {
  const prompt = `
  You are a professional content strategist.
  
  Generate a 30-day social media content calendar for a brand called "${brandName}" targeting "${targetAudience}" on "${platform}" with a "${tone}" tone.
  
  For each day (1 to 30), return:
  - A content idea
  - A caption
  - 3 to 5 relevant hashtags
  
  Format your response in strict JSON as an array of 30 items like this:
  [
    {
      "day": 1,
      "idea": "Sample idea",
      "caption": "Sample caption...",
      "hashtags": ["#tag1", "#tag2"]
    },
    ...
  ]
  `;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an expert content generator." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const raw = response.data.choices[0].message?.content;
    if (!raw) throw new Error("No response from OpenAI");

    const posts = JSON.parse(raw);
    return posts;
  } catch (error) {
    console.error("OpenAI error:", error);
    throw new Error("Failed to generate content");
  }
}
