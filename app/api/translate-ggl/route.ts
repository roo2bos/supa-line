import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { text } = await req.json();
  console.log(text);
  if (!text) {
    return NextResponse.json({ error: "Text is required" });
  }

  try {
    const response = await fetch(
      "https://translation.googleapis.com/language/translate/v2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: text,
          target: "ko",
          key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY, // 환경 변수로 API 키 관리
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Translation API request failed");
    }

    const data = await response.json();
    const translatedText = data.data.translations[0].translatedText;
    console.log(translatedText);

    return NextResponse.json({ success: true, data: translatedText });
  } catch (error) {
    if (error instanceof Error) {
      console.error("API Error:", error.message);
      return NextResponse.json({ success: false, error: error.message });
    }

    // 'Error'가 아닐 경우 대비
    console.error("Unknown error occurred:", error);
    return NextResponse.json({
      success: false,
      error: "Unknown error occurred.",
    });
  }
}
