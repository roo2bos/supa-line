import { NextResponse } from 'next/server';

// app/api/upload/route.js
// import { supabase } from '@/lib/supabaseClient';
import { createClient } from '@/utils/supabase/server'; // 서버에 맞는 클라이언트 가져오기

export async function POST(request: Request) {
  const supabase = createClient();

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: '파일이 필요합니다.' },
        { status: 400 },
      );
    }

    const uniqueFileName = `addfile-${Date.now()}-${file.name}`;
    const filePath = `public/${uniqueFileName}`;

    const { data, error } = await supabase.storage
      .from('supaline-bucket')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    console.log('파일 업로드: ', data, error);
    if (error) {
      throw error;
    }

    const { publicUrl } = supabase.storage
      .from('supaline-bucket')
      .getPublicUrl(filePath).data;

    console.log('publicUrl: ', publicUrl);
    // 성공적으로 생성된 경우
    return NextResponse.json({ url: publicUrl }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
