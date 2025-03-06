import axios from 'axios';
import { NextResponse } from 'next/server';

import { NEXT_PUBLIC_GOOGLE_API_KEY } from '@/_lib/constants/url.constant';

const YOUTUBE_API_KEY = NEXT_PUBLIC_GOOGLE_API_KEY;

export async function GET() {
  // const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=OLNY56MxFrczc5CoAvnTCDO_3bAdOLExkJQ&key=${YOUTUBE_API_KEY}&maxResults=12`;
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=OLNY56MxFrczc5CoAvnTCDO_3bAdOLExkJQ&key=${YOUTUBE_API_KEY}&maxResults=50`;

  // const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=KR&key=${YOUTUBE_API_KEY}`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    // console.log(data.items);
    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    return NextResponse.json(data.items);
  } catch (error) {
    // console.error('Error:', error);
    return NextResponse.json(
      { error: 'YouTube API 요청 중 오류 발생' },
      { status: 500 },
    );
  }
}

/**
 * @swagger
 * /api/music/top:
 *   get:
 *     summary: YouTube 이번주 베스트 음악 목록 조회
 *     description: 지정된 YouTube 플레이리스트에서 최대 50개의 음악 항목을 가져옵니다
 *     tags:
 *       - Music
 *     responses:
 *       200:
 *         description: 성공적으로 음악 목록을 조회했습니다
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   snippet:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       thumbnails:
 *                         type: object
 *                       resourceId:
 *                         type: object
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "YouTube API 요청 중 오류 발생"
 */
