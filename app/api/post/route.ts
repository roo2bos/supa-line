import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

/**
 * @swagger
 * /api/post:
 *   get:
 *     tags:
 *       - Board
 *     summary: 게시글 목록 조회
 *     description: 페이지네이션이 적용된 게시글 목록을 반환합니다
 *     parameters:
 *       - in: query
 *         name: pageIndex
 *         required: true
 *         schema:
 *           type: integer
 *         example: "1"
 *         description: "페이지 번호 (기본값: 1)"
 *       - in: query
 *         name: pageSize
 *         required: true
 *         schema:
 *           type: integer
 *         example: "12"
 *         description: "페이지당 게시글 수 (기본값: 12)"
 *     responses:
 *       200:
 *         description: 성공적으로 게시글 목록을 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 body:
 *                   type: string
 *                 file_url:
 *                   type: string
 *                 add_file:
 *                   type: string
 */
export async function GET(request: Request) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const pageParam = Number(searchParams.get('pageIndex')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 12;
  console.log(pageParam);
  const start = (pageParam - 1) * pageSize;
  const end = start + pageSize - 1;

  const { data, error, count } = await supabase
    .from('board')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(start, end);

  if (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 },
    );
  }

  return NextResponse.json({ total_cnt: count, list: data }, { status: 200 });
}

/**
 * @swagger
 * /api/post:
 *   post:
 *     tags:
 *       - Board
 *     summary: 새 게시글 작성
 *     description: 새로운 게시글을 생성합니다
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *               file_url:
 *                 type: string
 *               add_file:
 *                 type: string
 *     responses:
 *       200:
 *         description: 게시글 생성 성공
 *       500:
 *         description: 서버 오류
 */
export async function POST(request: Request) {
  const supabase = createClient();

  try {
    const { title, body, file_url, add_file } = await request.json();
    const { data, error } = await supabase.from('board').insert([
      {
        title,
        body,
        add_file,
        file_url,
      },
    ]);

    if (error) {
      console.error('Supabase Error:', error.message);
      return NextResponse.json(
        { message: 'Error saving post', error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: 'Post created successfully!', data });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : '알 수 없는 오류가 발생했습니다.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/post:
 *   put:
 *     tags:
 *       - Board
 *     summary: 게시글 수정
 *     description: 기존 게시글을 수정합니다
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *               add_file:
 *                 type: string
 *               file_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: 게시글 수정 성공
 *       500:
 *         description: 서버 오류
 */
export async function PUT(request: Request) {
  const supabase = createClient();

  try {
    const { id, title, body, add_file, file_url } = await request.json();
    console.log({ id, title, body, add_file, file_url });

    const { data, error } = await supabase
      .from('board')
      .update({ title, body, add_file, file_url })
      .eq('id', id);

    if (error) {
      console.error('Error updating post:', error.message);
      return NextResponse.json(
        { message: 'Error updating post', error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: 'Post Update successfully!', data });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : '알 수 없는 오류가 발생했습니다.';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

/**
 * @swagger
 * /api/post:
 *   delete:
 *     tags:
 *       - Board
 *     summary: 게시글 삭제
 *     description: 게시글을 삭제합니다
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: integer
 *                 description: 삭제할 게시글의 ID
 *     responses:
 *       200:
 *         description: 게시글 삭제 성공
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 오류
 */
export async function DELETE(request: Request) {
  const supabase = createClient();

  try {
    const { postId } = await request.json();

    if (!postId) {
      return NextResponse.json(
        { message: 'postId is required' },
        { status: 400 },
      );
    }

    const { error } = await supabase.from('board').delete().eq('id', postId);

    if (error) {
      console.error('Error deleting post:', error.message);
      return NextResponse.json(
        { message: 'Error deleting post', error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: 'Post deleted successfully!' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Server Error:', error.message);
      return NextResponse.json(
        { message: 'Error occurred', error: error.message },
        { status: 500 },
      );
    } else {
      console.error('Unknown error occurred');
      return NextResponse.json(
        { message: 'Unknown error occurred' },
        { status: 500 },
      );
    }
  }
}
