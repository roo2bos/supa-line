"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Ani() {
  return (
    <>
      <DotLottieReact
        src="/static/json/music_ani_tiger.lottie"
        loop
        autoplay
        speed={0.5}
        style={{ width: "200px", height: "200px" }} // 원하는 크기로 조절
      />
    </>
  );
}
