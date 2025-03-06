'use client';

import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/client';

export const supabase = createClient();

export async function signInWithGithub() {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: '/',
    },
  });

  if (error) {
    console.error('Error during sign-in:', error.message);
    redirect('/error');
  }
}

export async function signInWithGoogle() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: '/',
    },
  });

  if (error) {
    console.error('Error during sign-in:', error.message);
    redirect('/error');
  }
}

export async function signInWithFacebook() {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'facebook',
    options: {
      redirectTo: '/',
    },
  });

  if (error) {
    console.error('Error during sign-in:', error.message);
    redirect('/error');
  }
}

export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error during sign-out:', error.message);
    redirect('/error');
  }
}
