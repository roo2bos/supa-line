'use client';

import { useState } from 'react';
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsPencilSquare } from 'react-icons/bs';

import { Button } from '@/_components';
import Modal from '@/_components/Modal/Modal';
import { setPost } from '@/_services/board.service';
import { PostAddType, ResponseUpload } from '@/_types/board.type';

export const uploadFile = async (file: File): Promise<ResponseUpload> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('업로드 실패');
  }

  console.log(response);
  return response.json();
};

export default function PostAdd() {
  const queryClient = useQueryClient();
  const [visible, setVisible] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting /* , isValid */ },
  } = useForm<PostAddType>({
    defaultValues: {
      title: '',
      body: '',
      file_url: '',
    },
  });

  //seMutationResult<성공 시 반환 타입, 오류 타입, 요청에 사용되는 변수 타입>
  const mutation: UseMutationResult<PostAddType, Error, PostAddType> =
    useMutation({
      mutationFn: setPost,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['posts'] }); // 🔹 목록 캐시 무효화
      },
      onError: (error: Error) => {
        console.error('Error saving post:', error.message);
      },
    });

  const onSubmit: SubmitHandler<PostAddType> = async (data) => {
    //data.add_file: FileList[{}]
    const file = data.add_file?.length ? data.add_file[0] : null;
    // console.log('onSubmit: ', data.add_file?.length, data.add_file, file);
    if (file instanceof File) {
      const uploadResult: ResponseUpload = await uploadFile(file);
      console.log(uploadResult);
      mutation.mutate({
        ...data,
        add_file: uploadResult.url, // uploadFile에서 반환된(전체 경로 파일명) 이름
      });
    } else {
      mutation.mutate({
        ...data,
      });
    }

    reset();
    setVisible(false);
  };

  const onCancel = () => {
    reset();
    setVisible(false);
  };

  return (
    <>
      <Button icon={<BsPencilSquare />} onClick={() => setVisible(!visible)} />
      {visible && (
        <Modal isShow={visible} onClick={() => setVisible(false)}>
          <form
            onSubmit={handleSubmit(onSubmit)} // 수동 제출
            className="flex flex-col gap-5"
          >
            <input
              type="text"
              className="p-2 border rounded"
              placeholder="Title"
              {...register('title', { required: '제목은 필수 입니다' })}
              aria-invalid={
                isSubmitting ? (errors.title ? 'true' : 'false') : undefined
              }
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
            <textarea
              placeholder="Content"
              className="p-2 border rounded h-100"
              {...register('body', { required: '내용은 필수 입니다' })}
              aria-invalid={
                isSubmitting ? (errors.body ? 'true' : 'false') : undefined
              }
            />
            {errors.body && (
              <p className="text-red-500">{errors.body.message}</p>
            )}

            <input
              type="text"
              placeholder="Enter file path"
              {...register('file_url')}
              className="px-2 py-1 mb-2 border rounded"
            />
            <input
              type="file"
              {...register(
                'add_file' /* {
                validate: {
                  size: (files) =>
                    files[0]?.size < 5 * 1024 * 1024 ||
                    '파일은 5MB 이하여야 합니다.',
                },
              } */,
              )}
            />
            <div className="grid grid-cols-2 gap-10 text-center">
              <Button
                color="primary"
                variant="outlined"
                full
                onClick={onCancel}
                className="justify-center px-4 py-2 bg-blue-500 rounded btn hover:bg-blue-600"
              >
                취소
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                full
                className="justify-center px-4 py-2 bg-blue-500 rounded"
                disabled={mutation.status == 'pending' || isSubmitting} // 사용중인지 확인 /  || !isValid
              >
                {mutation.status == 'pending' ? '등록 중...' : '등록'}
              </Button>
            </div>
            {mutation.isError && (
              <p className="text-red-500">
                Error saving post: {mutation.error?.message}
              </p>
            )}
          </form>
        </Modal>
      )}
    </>
  );
}
