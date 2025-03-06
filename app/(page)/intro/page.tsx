'use client';
import { useEffect } from 'react';
import AOS from 'aos';
import classNames from 'classnames';
import { FaJsSquare } from 'react-icons/fa';
import {
  SiDocker,
  SiGit,
  SiGithub,
  SiNextdotjs,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiReact,
  SiNodedotjs,
} from 'react-icons/si';

import { Body } from '@/_components';
import { NEXT_PUBLIC_IMG_URL } from '@/_lib/constants/url.constant';

const ICON_CLASS = 'block w-full h-full';

const skills = [
  { icon: <SiHtml5 className={ICON_CLASS} />, label: 'HTML' },
  { icon: <SiCss3 className={ICON_CLASS} />, label: 'CSS' },
  { icon: <FaJsSquare className={ICON_CLASS} />, label: 'JS' },
  { icon: <SiReact className={ICON_CLASS} />, label: 'REACT.JS' },
  { icon: <SiNextdotjs className={ICON_CLASS} />, label: 'NEXT.JS' },
  { icon: <SiTailwindcss className={ICON_CLASS} />, label: 'TAILWIND CSS' },
  { icon: <SiTypescript className={ICON_CLASS} />, label: 'TYPESCRIPT' },
  { icon: <SiMongodb className={ICON_CLASS} />, label: 'MONGO DB' },
  { icon: <SiPostgresql className={ICON_CLASS} />, label: 'POSTGRESQL' },
  { icon: <SiNodedotjs className={ICON_CLASS} />, label: 'Node.JS' },
  { icon: <SiDocker className={ICON_CLASS} />, label: 'DOCKER' },
  { icon: <SiGithub className={ICON_CLASS} />, label: 'GITHUB' },
  { icon: <SiGit className={ICON_CLASS} />, label: 'GIT' },
];

export default function IntroPage() {
  useEffect(() => {
    AOS.init({
      // duration: 1000, // 애니메이션 지속 시간
      // easing: 'ease-in-sine', // 애니메이션 이징
      once: true, // 한 번만 애니메이션 실행
    });

    // AOS를 초기화한 후, 페이지가 로드될 때 요소를 다시 계산합니다.
    // AOS.refresh();
  }, []);

  return (
    <Body
      container="default"
      // className={classNames(
      //   'h-[50vh] bg-cover bg-no-repeat bg-center bg-[url(https://ykxqljvkwzrpzeuqsupf.supabase.co/storage/v1/object/public/supaline-bucket/snow_leopard_1920x1200.jpg)]',
      //   'after:absolute after:inset-0 after:mix-blend-color after:bg-[rgba(237,244,255,.7)]/70'
      // )}
    >
      <div
        className={classNames(
          'bg-cover bg-no-repeat bg-center',
          //h-[50vh]
          'h-500',
          'after:absolute after:inset-0 after:mix-blend-color after:bg-[rgba(237,244,255,.7)]/70',
        )}
        style={{
          backgroundImage: `url('${NEXT_PUBLIC_IMG_URL}/snow_leopard_1920x1200.jpg')`,
        }}
      >
        {' '}
        Intro page
      </div>
      <ul className="mt-md grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] tablet:grid-cols-3 justify-center gap-10">
        {skills.map((skill, index) => (
          <li
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 50}
            className="flex flex-col items-center justify-center gap-10 drop-shadow-lg"
          >
            <div className="w-40 aspect-square text-primary">{skill.icon}</div>
            <span className="text-primary/80">{skill.label}</span>
          </li>
        ))}
      </ul>
    </Body>
  );
}
