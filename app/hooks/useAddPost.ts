import { useMutation /* , UseMutationResult */ } from '@tanstack/react-query';
import axios from 'axios';

interface Post {
  title: string;
  body: string;
  file_url: string;
}

const addPost = async (post: Post) => {
  const response = await axios.post<Post>('/api/post', post);
  return response.data;
};

// UseMutationOptions의 제네릭 타입 설정
export const useAddPost = () => {
  return useMutation<Post, Error, Post>({
    mutationFn: addPost,
    onSuccess: () => {
      // 성공 시 동작
    },
    onError: (error: Error) => {
      console.error('Error saving post:', error);
    },
  });
};
