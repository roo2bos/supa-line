'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import api from '@/utils/api';

const deletePost = async (postId: number) => {
  const response = await axios.delete(`/post`, {
    data: { postId },
  });
  return response.data;
};

interface PostDeleteButtonProps {
  postId: number;
  refetchPosts: () => void;
}

const PostDeleteButton = ({ postId, refetchPosts }: PostDeleteButtonProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const mutation = useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      refetchPosts(); // Refetch posts after successful delete
      setIsConfirmOpen(false); // 모달 닫기
    },
  });

  return (
    <>
      <button onClick={() => setIsConfirmOpen(true)} className="text-sm">
        삭제
      </button>
      {/* 삭제 확인 모달 */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <p className="mb-4 text-lg font-semibold">정말 삭제하시겠습니까?</p>
            <div className="flex justify-end space-x-3">
              {/* 취소 버튼 */}
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="px-4 py-2 text-black bg-gray-300 rounded hover:bg-gray-400"
              >
                취소
              </button>
              {/* 삭제 버튼 */}
              <button
                onClick={() => mutation.mutate()}
                className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-red-600"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDeleteButton;
