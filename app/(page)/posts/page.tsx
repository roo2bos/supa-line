// 'use client';
// import { useState } from 'react';
import { Body, PageTitle } from '@/_components';

import PostAdd from './_components/PostAdd';
import PostList from './_components/PostList';

export default function Posts() {
  // const [isWriteMode, setIsWriteMode] = useState(false);
  return (
    <Body container="default">
      <div className="flex justify-between">
        <PageTitle label="Board" />
        <div className="flex flex-col items-end justify-end">
          <PostAdd />
        </div>
      </div>
      <PostList />
    </Body>
  );
}
