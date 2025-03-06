'use client';

import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/client';
// import { revalidatePath } from 'next/cache';

export const supabase = createClient();

export async function signInWithGithub() {
  const supabase = createClient();
  const { /* data, user, */ error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback',
    },
  });

  if (error) {
    console.error('Error during sign-in:', error.message);
    redirect('/error');
  } else {
    // console.log('Successfully signed in with github:', data);
    // revalidatePath('/', 'layout')
    // redirect('/')
  }
}

export async function signInWithGoogle() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      // redirectTo: process.env.NEXT_PUBLIC_SUPABASE_URL,
      redirectTo: 'http://localhost:3000/auth/callback',

      // redirectTo: '/auth/callback',
    },
  });

  if (error) {
    console.error('Error during sign-in:', error.message);
    redirect('/error');
  } else {
    // console.log('Successfully signed in with Google:', data);
    // revalidatePath('/', 'layout')
    // redirect('http://localhost:3000/auth/callback')
  }

}

export async function signInWithFacebook() {
  const supabase = createClient();
  const { /* data, */ error } = await supabase.auth.signInWithOAuth({
    provider: 'facebook',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback',
    },
  });

  if (error) {
    console.error('Error during sign-in:', error.message);
    redirect('/error');
  } else {
    // console.log('Successfully signed in with Facebook:', data);
    // revalidatePath('/', 'layout')
    // redirect('http://localhost:3000/auth/callback')
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
