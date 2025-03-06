'use client';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

import { createClient } from '@/utils/supabase/client';

interface UserData {
  id: string;
  userInfo: {
    provider: string | undefined;
    avatar_url: string;
    email: string;
    full_name: string;
    name: string;
    nickname: string;
    user_name: string;
  };
}

// 사용자 정보를 포함한 Context 타입 정의
interface AuthContextType {
  isAuthenticated: boolean;
  user: UserData | null; // user 정보를 추가
  // getUserById: (userId: string) => Promise<{ name: string } | null>;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const supabase = createClient();
  const [user, setUser] = useState<UserData | null>(null); // user 상태
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null); // 로그아웃 시 user 정보 초기화
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        const userInfo = {
          id: data.user.id,
          userInfo: {
            provider: data.user.app_metadata.provider,
            avatar_url: data.user.user_metadata.avatar_url,
            email: data.user.user_metadata.email,
            full_name: data.user.user_metadata.full_name,
            name: data.user.user_metadata.name,
            nickname: data.user.user_metadata.nickname,
            user_name: data.user.user_metadata.user_name,
          },
        };
        // setUser(data.user || data.user.email);  // user 정보 설정
        setUser(userInfo); // user 정보 설정
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      checkAuth(); // 상태 변화시 재확인
    });

    return () => {
      authListener?.subscription.unsubscribe(); // 상태 변경 리스너 정리
    };
  }, [supabase]);

  //   useEffect(() => {
  //   const alluser = async () => {
  //     const { data, error } = await supabase.from("auth.users").select("*");
  //     console.log('전체 유저',data)
  //   }
  //   alluser()
  // },[supabase])

  // const getUserById = async (userId: string) => {
  //   const { data, error } = await supabase
  //     .from('auth.users')
  //     .select('name')
  //     .eq('id', userId)
  //     .single();

  //   console.log('유저:', data);
  //   if (error) {
  //     console.error('Failed to fetch user:', error);
  //     return null;
  //   }

  //   return data;
  // };

  return (
    <AuthContext.Provider
      // value={{ isAuthenticated, user, getUserById, login, logout }}
      value={{ isAuthenticated, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// useAuth hook으로 Context 값 접근
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
