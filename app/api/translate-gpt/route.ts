import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// // OpenAI API 설정
// const API_KEYS = process.env.OPENAI_API_KEYS?.split(',') || [];
// const ENDPOINT = 'https://api.openai.com/v1/chat/completions';

// let keyIndex = 0;

// // API 키 순환 선택
// function getNextApiKey() {
//   const key = API_KEYS[keyIndex];
//   keyIndex = (keyIndex + 1) % API_KEYS.length;
//   return key;
// }

const API_KEY = process.env.OPENAI_API_KEY; // 단일 키 사용
const ENDPOINT = "https://api.openai.com/v1/chat/completions";

if (!API_KEY) {
  throw new Error("OPENAI_API_KEY 환경 변수가 설정되지 않았습니다.");
}

// 번역 함수
async function translateToKorean(text: string): Promise<string> {
  try {
    // const apiKey = getNextApiKey();
    const response = await axios.post(
      ENDPOINT,
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Translate the following text into Korean: ${text}`,
          },
        ],
        temperature: 0.7,
      },
      {
        headers: {
          // Authorization: `Bearer ${apiKey}`,
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data.choices[0].message.content.trim();
  } catch (error: any) {
    console.error("OpenAI API Error:", error.response?.data || error.message);
    throw new Error("Translation failed.");
  }
}

// Next.js API Route
export async function POST(req: NextRequest) {
  try {
    // 요청 데이터 읽기
    const { input } = await req.json();
    if (!input || typeof input !== "string") {
      return NextResponse.json({ success: false, error: "Invalid input." });
    }

    // 번역 수행
    const translatedText = await translateToKorean(input);
    return NextResponse.json({ success: true, data: translatedText });
  } catch (error) {
    // 'error'가 'Error'인지 확인 후 처리
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
