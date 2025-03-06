import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { question } = await request.json();

  try {
    const response = await axios.post(
      "https://api.x.ai/v1/chat/completions",
      {
        model: "grok-beta",
        messages: [
          {
            role: "system",
            content:
              "당신은 Grok입니다, 주어진 글을 읽고 한국어로 번역하여 답변을 하세요.",
          },
          {
            role: "user",
            content: question,
          },
        ],
        max_tokens: 150, // 생성할 최대 토큰 수
        temperature: 0.7, // 창의성 조절, 0에서 1 사이의 값
        stream: false, // 실시간 스트리밍 사용 안 함
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.XAI_API_KEY}`, // 환경 변수에서 API 키를 가져옵니다.
        },
      },
    );

    // 응답에서 가장 관련 있는 답변을 선택
    const answer =
      response.data.choices?.[0]?.message?.content ||
      "답변을 생성할 수 없습니다.";
    console.log(answer);

    return NextResponse.json({ answer }, { status: 200 });
  } catch (error) {
    console.error("API 호출 중 오류:", error);
    return NextResponse.json(
      { error: "API 요청 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
