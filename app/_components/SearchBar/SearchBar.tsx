import { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { BiSearch } from 'react-icons/bi';

import { Button } from '@/_components';

const SearchBar = ({
  type = 'content',
  className,
}: {
  type?: 'header' | 'content';
  className?: string;
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const initialQuery = params.get('q') || ''; // null 대신 바로 ''로 설정
  // console.log('query:', initialQuery);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { query: initialQuery },
  });

  /** 🔹 검색 실행 */
  const handleSearch = useCallback(
    (data: { query: string }) => {
      const trimmedQuery = (data.query || '').trim();
      console.log('검색 엔터: ', data.query);
      // if (!query) return;
      router.push(`/music/search?q=${encodeURIComponent(trimmedQuery)}`, {
        scroll: false,
      });
    },
    [router],
  );
  useEffect(() => {
    reset({ query: initialQuery }); // q 값이 없으면 ''로 리셋
  }, [initialQuery, reset]);

  return (
    <form
      onSubmit={handleSubmit(handleSearch)}
      className={classNames(
        'relative flex items-center rounded-md',
        type === 'header' ? '' : '',
        className,
      )}
    >
      <input
        type="text"
        {...register('query')}
        placeholder="음악 검색"
        className="bg-white border border-gray-400 rounded-md pl-sm pr-lg py-xs"
      />
      <Button
        type="submit"
        icon={<BiSearch />}
        size="md"
        className="absolute font-bold right-xs text-primary"
      />
    </form>
  );
};

export default SearchBar;
