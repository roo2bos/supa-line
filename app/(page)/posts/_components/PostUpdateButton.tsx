'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

import { Button } from '@/_components';
import Modal from '@/_components/Modal/Modal';
import { updatePost } from '@/_services/board.service';
import { PostUpdateType, ResponseUpload } from '@/_types/board.type';

import { uploadFile } from './PostAdd';

interface PostUpdateButtonProps {
  inputData: PostUpdateType;
  refetchPosts: () => void;
}
export default function PostUpdateButton({
  inputData,
  refetchPosts,
}: PostUpdateButtonProps) {
  const [visible, setVisible] = useState(false);
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PostUpdateType>(/* {
    defaultValues: {
      title: inputData.title,
      body: inputData.body,
      file_url: inputData.file_url,
    },
  } */);

  const mutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      refetchPosts(); // Refetch posts after successful update
      clearErrors();
      setVisible(false);
    },
  });

  const onOpen = () => {
    reset({
      title: inputData.title,
      body: inputData.body,
      file_url: inputData.file_url,
    });
    setVisible(true);
  };
  const onSubmit = async (data: PostUpdateType) => {
    const file = data.add_file?.length ? data.add_file[0] : null;
    // console.log('onSubmit: ', data.add_file?.length, data.add_file, file);
    
    if (file instanceof File) {
      const uploadResult:ResponseUpload = await uploadFile(file);
      console.log(uploadResult.url);
      mutation.mutate({
        ...data,
        id: inputData.id,
        add_file: uploadResult.url, // uploadFile에서 반환된(전체 경로 파일명) 이름
      });
      console.log('파일 첨부 한 상태 전송');
    } else {
      mutation.mutate({
        ...data,
        id: inputData.id,
        add_file: inputData.add_file,
      });
      console.log('파일 첨부 안한 상태 전송');
    }
    reset();
    refetchPosts();
    setVisible(false);
  };

  const onCancel = () => {
    reset();
    setVisible(false);
  };
  return (
    <>
      <button onClick={onOpen} className="text-sm">
        수정
      </button>
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
            <div className="flex items-center gap-4">
              {inputData.add_file?.length &&
                typeof inputData.add_file === 'string' && (
                  <Image
                    src={inputData.add_file ?? ''}
                    alt=""
                    width={34}
                    height={34}
                    className="flex-none object-cover h-full bg-gray-300 border aspect-square"
                  />
                )}
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
                className="flex-1 border cursor-pointer"
              />
            </div>
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
