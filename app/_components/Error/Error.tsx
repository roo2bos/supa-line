"use client";
import { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { CONST } from "@/_lib/constants";

export default function ErrorPage({
  message = (
    <>
      문제가 계속된다면
      <br />
      roo2bos@gmail.com으로 문의해 주세요.
    </>
  ),
}: {
  message?: ReactNode;
}) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <>
        <h1 className="font-bold mb-50">{CONST.TITLE.SITE_TITLE}</h1>
        {message}
        <p className="flex gap-20 mt-50">
          <button
            onClick={() => {
              router.back();
            }}
          >
            뒤로가기
          </button>
          <Link href="/">메인</Link>
        </p>
      </>
    </div>
  );
}
