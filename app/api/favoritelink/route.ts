import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export async function GET() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('favoritelink')
    .select()
    .order('created_at', { ascending: false }); // 최신순으로 정렬;
  console.log('fav: ', data);

  if (error) {
    return NextResponse.json(
      { error: 'Failed to fetch favoritelink' },
      { status: 500 },
    );
  }

  return NextResponse.json(data, { status: 200 });
}
