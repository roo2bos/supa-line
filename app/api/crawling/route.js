import fs from "fs";

import puppeteer from "puppeteer";

export async function POST(req) {
  const { url } = await req.json();

  if (!url) {
    return new Response(JSON.stringify({ error: "URL is required" }), {
      status: 400,
    });
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    const html = await page.content(); // 페이지의 HTML 가져오기

    // HTML을 파일로 저장합니다.
    fs.writeFileSync("youtube_channel.html", renderedHtml);

    console.log("HTML이 youtube_channel.html로 저장되었습니다.");

    await browser.close();

    return new Response(JSON.stringify({ html }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch HTML" }), {
      status: 500,
    });
  }
}
