'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import { Body } from '@/_components';
import PageTitle from '@/_components/PageTitle/PageTitle';
import { getFavoriteLink } from '@/_services/etc.service';
import { FavoriteLinkType } from '@/_types/etc.type';

export default function FavoriteLinkPage() {
  const { data, error, isLoading } = useQuery<FavoriteLinkType[], Error>({
    queryKey: ['favoritelink'],
    queryFn: getFavoriteLink,
  });

  isLoading && <div>Loading...</div>;
  error && <div>Error: {error.message}</div>;

  return (
    <Body>
      <PageTitle label="Favorite Link" />
      <ul>
        {data?.map((item) => (
          <li className="" key={item.id}>
            <Link href={item.url} target="_blank" rel="noreferrer">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </Body>
  );
}
