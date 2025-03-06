'use client';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { FaFacebook, FaGithub, FaUserCircle } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { MdEmail } from 'react-icons/md';
import { TiArrowSortedDown } from 'react-icons/ti';
import { TiArrowSortedUp } from 'react-icons/ti';

import { supabase } from '@/(page)/login/oauth';
import Button from '@/_components/Button/Button';
import Dimmed from '@/_components/Dimmed/Dimmed';

import { useAuth } from '../../AuthContext/AuthContext';

export default function LogButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isShow, setIsShow] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();
  // 유저의 로그인 상태를 확인
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data?.session); // 세션이 있으면 로그인 상태로 설정
      // console.log(isAuthenticated, user, logout, data);
    };

    checkSession();

    // 세션 변화에 따른 리스너 설정 (로그인/로그아웃 이벤트 캐치)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // login();
        setIsLoggedIn(!!session);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [isAuthenticated, user, logout]);

  // 로그아웃 함수
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  const handleToggle = () => {
    setIsShow(!isShow);
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <input type="checkbox" id="profile" className="hidden peer" />
          <label
            htmlFor="profile"
            className="relative flex flex-col items-center justify-center bg-gray-300 rounded-full cursor-pointer w-44 aspect-square"
            onClick={handleToggle}
          >
            <Dimmed
              isShow={isShow}
              onClick={() => setIsShow(false)}
              transparent
            />
            {user?.userInfo.provider === 'google' && (
              <FcGoogle className="w-20 h-20" />
            )}
            {user?.userInfo.provider === 'facebook' && (
              <FaFacebook className="w-20 h-20" />
            )}
            {user?.userInfo.provider === 'github' && (
              <FaGithub className="w-20 h-20" />
            )}
            {user?.userInfo.provider === 'email' && (
              <MdEmail className="w-20 h-20" />
            )}
            {user?.userInfo.provider === 'credentials' && (
              <FaUserCircle className="w-20 h-20" />
            )}
          </label>
          <TiArrowSortedDown className="absolute block w-16 -translate-y-1/2 top-1/2 -right-2 aspect-square peer-checked:hidden" />
          <TiArrowSortedUp className="absolute hidden w-16 -translate-y-1/2 top-1/2 -right-2 aspect-square peer-checked:block" />
          <ul
            className={classNames(
              'absolute right-0 hidden bg-white border min-w-200 border-gray-300 rounded-sm top-full py-xs px-sm whitespace-nowrap mt-10',
              // 'before:absolute before:right-12 before:bottom-full before:w-0 before:h-0 before:border-8 before:border-transparent before:border-b-gray-300 before:border-b-8',
              'before:absolute before:right-12 before:bottom-full before:w-0 before:h-0 before:border-8 before:border-transparent before:border-b-gray-300 before:border-b-8',
              'after:absolute after:right-14 after:bottom-full after:mt-1 after:w-0 after:h-0 after:border-6 after:border-transparent after:border-b-white after:border-b-6',
              // 'after:absolute after:right-12 after:bottom-[calc(100%-1px)] after:mt-1 after:w-0 after:h-0 after:border-8 after:border-transparent after:border-b-white after:border-b-8',
              'peer-checked:block',
              // 'peer-hover:block',
            )}
          >
            <li>{user && user.userInfo.name}</li>
            <li>마이페이지</li>
            <li className="relative text-right">
              {/* <Button onClick={handleLogout} icon={<TbLogout />} /> */}
              <Button onClick={handleLogout} className="text-gray-600">
                로그아웃
              </Button>
            </li>
          </ul>
        </>
      ) : (
        <Link
          href={`/login`}
          className="flex flex-col items-center justify-center bg-gray-300 rounded-full w-44 aspect-square"
        >
          <FaUserCircle className="w-20 h-20 aspect-square" />
        </Link>
      )}
    </>
  );
}
