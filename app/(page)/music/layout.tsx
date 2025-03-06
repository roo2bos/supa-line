'use client';

import classNames from 'classnames';

import { Body, PageTitle } from '@/_components';

import Ani from './_components/Ani';
import MusicHeader from './_container/MusicHeader';

export default function MusicLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Body>
      <PageTitle label="Music" />
      <div className="flex justify-end">
        <Ani />
      </div>
      <div className={classNames('bg-slate-100 rounded-xl desktop:rounded-xl')}>
        <MusicHeader />
        {children}
      </div>
    </Body>
  );
}
