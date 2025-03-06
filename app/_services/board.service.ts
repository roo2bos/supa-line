import {
  GetPostParams,
  PostAddType,
  ResponsePostList,
} from '@/_types/board.type';
import api from '@/utils/api';

// 데이터 조회 함수
export const getPost = async ({
  pageParam,
}: GetPostParams): Promise<ResponsePostList> => {
  const response = await api.get(`/post?pageIndex=${pageParam}`);
  const data = await response.data;

  console.log('pageParam:', pageParam, data);
  return data;
};

// 게시물을 서버에 추가하는 함수
export const setPost = async (post: PostAddType) => {
  const response = await api.post('/post', post);
  return response.data;
};
// 게시물을 서버에 추가하는 함수
export const updatePost = async (post: PostAddType) => {
  const response = await api.put('/post', post);
  return response.data;
};
