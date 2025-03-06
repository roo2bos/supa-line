import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

type Data = {
  result?: string;
  error?: string;
};

export async function POST(req: NextRequest, res: NextResponse<Data>) {
  const apiKey = process.env.GOOGLE_AI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not set" },
      { status: 500 },
    );
  }

  try {
    const reqBody = await req.json();
    const prompt = reqBody.prompt as string;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // 모델을 gemini-2.0-flash 로 변경
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ result: text }, { status: 200 });
  } catch (error: any) {
    console.error("Error generating text:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate text" },
      { status: 500 },
    );
  }
}
