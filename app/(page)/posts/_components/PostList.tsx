'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/_components';
import PostOwnerGuard from '@/_components/PostOwnerGuard/PostOwnerGuard';
import { getPost } from '@/_services/board.service';
import { PostType } from '@/_types/board.type';

import PostDeleteButton from './PostDeleteButton';
import PostUpdateButton from './PostUpdateButton';
import ThumbLink from './ThumbLink';

export default function PostList() {
  const {
    data: posts,
    error,
    isLoading,
    refetch,
    fetchNextPage, //infinite query 사용
    hasNextPage, //infinite query 사용
  } = useInfiniteQuery({
    queryKey: ['posts'], // 쿼리 키
    queryFn: ({ pageParam }) => getPost({ pageParam }), // 쿼리 함수
    initialPageParam: 1, //infinite query 사용
    // enabled: false, // 초기 실행 방지
    getNextPageParam: (lastPage, allPages) => {
      // const totalPosts = lastPage.total_cnt; // 전체 게시                                                                                                         물 수
      // const nextPage = allPages.length + 1; // 다음 페이지 번호
      // console.log(nextPage, totalPosts);
      // return nextPage <= totalPosts ? nextPage : undefined; // 더 이상 페이지가 없으면 undefined
      const totalPosts = lastPage.total_cnt; // 전체 게시물 수 (47)
      const postsPerPage = 12; // 한 페이지당 게시물 수
      const totalPages = Math.ceil(totalPosts / postsPerPage); // 총 페이지 수 (4)
      const nextPage = allPages.length + 1; // 다음 페이지 번호
      console.log(nextPage, totalPages);
      return nextPage <= totalPages ? nextPage : undefined; // 5 > 4면 undefined 반환
    },
  });
  console.log(posts);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching posts</div>;

  const allPosts = posts?.pages.flatMap((page) => page.list) || [];
  // console.log(allPosts, posts);
  console.log(hasNextPage);
  return (
    <>
      {posts && (
        <>
          전체: {posts && posts.pages[0].total_cnt}
          <ul className="grid grid-cols-1 gap-10 mt-20 divide-y divide-gray-200 tablet:grid-cols-2 desktop:grid-cols-3">
            {/* {posts.pages.map((page: ResponsePostList) =>
              page.list.map((post: PostType) => { */}
            {allPosts.map((post: PostType) => {
              const fileToShow = post.add_file || post.file_url;
              return (
                <li
                  key={post.id}
                  className="group grid grid-cols-[1fr_minmax(50px,120px)] gap-5 rounded-xl border border-gray-300 bg-white p-sm dark:border-gray-800 dark:bg-white/[0.03] tablet:flex-row tablet:items-center tablet:gap-6 hover:shadow-md transition-shadow duration-300"
                >
                  <div>
                    <h4 className="mb-1 font-bold text-gray-800 text-theme-xl dark:text-white/90 group-hover:underline">
                      #{post.id} {post.title}
                    </h4>

                    <p className="text-sm text-gray-500 mb-sm dark:text-gray-400 h-lg line-clamp-2">
                      {post.body}
                    </p>

                    <PostOwnerGuard userId={post.user_id}>
                      <div className="mt-3 space-x-4">
                        <PostUpdateButton
                          inputData={{ ...post }}
                          refetchPosts={refetch}
                        />
                        <PostDeleteButton
                          postId={post.id}
                          refetchPosts={refetch}
                        />
                      </div>
                    </PostOwnerGuard>
                    {post.file_url && <ThumbLink fileUrl={post.file_url} />}
                  </div>
                  <div className="flex items-center justify-center flex-1">
                    {fileToShow && (
                      <Link
                        href={fileToShow || ''}
                        target="_blank"
                        rel="nopener noreferrer"
                        className="relative block w-full h-auto overflow-hidden rounded-lg"
                      >
                        <Image
                          src={fileToShow}
                          fill
                          alt=""
                          className="!relative !h-auto object-contain overflow-hidden rounded-lg"
                        />
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
            {/* }),
            )} */}
          </ul>
          <p className="text-center mt-lg">
            <Button
              variant="contained"
              color="primary"
              disabled={!hasNextPage}
              onClick={() => fetchNextPage()}
              className="inline-flex items-center gap-2 px-4 py-3 mt-4 text-sm font-medium text-white rounded-lg w-100 bg-brand-500 shadow-theme-xs hover:bg-brand-600"
            >
              더보기
            </Button>
          </p>
        </>
      )}
    </>
  );
}
