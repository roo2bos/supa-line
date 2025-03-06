// app/api/download/route.js
// import { supabase } from '@/lib/supabaseClient';
import { createClient } from '@/utils/supabase/server'; // 서버에 맞는 클라이언트 가져오기

export async function GET(request) {
  const supabase = createClient();
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get('path');

  const { data, error } = await supabase.storage
    .from('supaline-bucket')
    .download(filePath);

  if (error) {
    return new Response(JSON.stringify({ error }), { status: 400 });
  }

  const fileBlob = await data.blob();
  return new Response(fileBlob, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${filePath.split('/').pop()}"`,
    },
  });
}
