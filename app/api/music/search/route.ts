// app/api/youtube/route.ts
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

import { NEXT_PUBLIC_GOOGLE_API_KEY } from '@/_lib/constants/url.constant';

/**
 * @swagger
 * /api/music/search:
 *   get:
 *     tags:
 *       - Music
 *     summary: "음악 검색 API"
 *     description: "YouTube에서 음악 비디오를 검색합니다."
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: "검색할 음악 키워드"
 *         schema:
 *           type: string
 *         example: "BTS Dynamite"
 *     responses:
 *       200:
 *         description: "성공"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   kind:
 *                     type: string
 *                   etag:
 *                     type: string
 *                   id:
 *                     type: object
 *                     properties:
 *                       kind:
 *                         type: string
 *                       videoId:
 *                         type: string
 *                   snippet:
 *                     type: object
 *                     properties:
 *                       publishedAt:
 *                         type: string
 *                         format: date-time
 *                       channelId:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       thumbnails:
 *                         type: object
 *                         properties:
 *                           default:
 *                             type: object
 *                             properties:
 *                               url:
 *                                 type: string
 *                               width:
 *                                 type: integer
 *                               height:
 *                                 type: integer
 *                           medium:
 *                             type: object
 *                             properties:
 *                               url:
 *                                 type: string
 *                               width:
 *                                 type: integer
 *                               height:
 *                                 type: integer
 *                           high:
 *                             type: object
 *                             properties:
 *                               url:
 *                                 type: string
 *                               width:
 *                                 type: integer
 *                               height:
 *                                 type: integer
 *                       channelTitle:
 *                         type: string
 *                       liveBroadcastContent:
 *                         type: string
 *                       publishTime:
 *                         type: string
 *                         format: date-time
 */

const YOUTUBE_API_KEY = NEXT_PUBLIC_GOOGLE_API_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return new NextResponse(
      JSON.stringify({ error: '검색어를 제공해야 합니다.' }),
      {
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*', // 모든 도메인에서 요청 허용
        },
      },
    );
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    // `${query} official music video`,
    `${query} m/v`,
  )}&key=${YOUTUBE_API_KEY}&type=video&videoCategoryId=10&maxResults=50`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    // console.log(response.data);

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }
    return NextResponse.json(data.items);
    // return new NextResponse(JSON.stringify(response.data.items), {
    //   headers: {
    //     "Access-Control-Allow-Origin": "*", // 모든 도메인에서 요청 허용
    //     "Access-Control-Allow-Methods": "GET", // 허용 메서드 추가
    //   },
    // });
  } catch (error: any) {
    // console.error('API 요청 중 오류 발생:', error.message);
    return NextResponse.json(
      { error: 'YouTube API 요청 중 오류 발생' },
      { status: 500 },
    );
    // return new NextResponse(
    //   JSON.stringify({ error: 'YouTube API 요청 중 오류 발생' }),
    //   {
    //     status: 500,
    //     headers: {
    //       'Access-Control-Allow-Origin': '*', // 모든 도메인에서 요청 허용
    //     },
    //   },
    // );
  }
}
