import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

const scrapeWebsite = async (code: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  try {
    await page.goto(
      `https://m.stock.naver.com/domestic/stock/${code}/discuss`,
      {
        waitUntil: 'networkidle2', // 모든 네트워크 요청이 완료될 때까지 대기
      },
    );

    // 페이지 스크롤 및 데이터 로드
    const scrollToBottom = async () => {
      await page.evaluate(async () => {
        // 현재 스크롤 위치
        let previousHeight = 0;

        while (document.body.scrollHeight > previousHeight) {
          // 페이지를 스크롤
          window.scrollBy(0, window.innerHeight);
          // 스크롤 후 로드 시간 대기
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // 새로운 높이
          const newHeight = document.body.scrollHeight;

          // 이전 높이와 현재 높이가 같으면 종료
          if (newHeight === previousHeight) break;
          previousHeight = newHeight;
        }
      });
    };

    await scrollToBottom(); // 스크롤을 내리며 데이터 로드

    // 데이터를 추출
    const articles = await page.evaluate(() => {
      const data: { title: string; body: string }[] = [];
      const listItems = document.querySelectorAll(
        'ul[class*="DiscussListItem_list"] li',
      ); // 실제 클래스 이름으로 변경
      // const titles = document.querySelectorAll('.listCard li strong'); // 실제 클래스 이름으로 변경
      // const bodys = document.querySelectorAll('.listCard li p'); // 실제 클래스 이름으로 변경

      listItems.forEach((item) => {
        const title = item.querySelector('strong')?.textContent?.trim() || '';
        const body = item.querySelector('p')?.textContent?.trim() || '';
        data.push({ title, body });
      });

      return data;
    });

    return articles;
  } catch (error) {
    console.error('Error scraping website:', error);
    return [];
  } finally {
    await browser.close(); // 브라우저 닫기
  }
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code') || '005930';
  console.log(code);
  const articles = await scrapeWebsite(code);
  return NextResponse.json(articles);
}
