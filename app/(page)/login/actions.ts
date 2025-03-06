'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

// export async function signInWithGithub() {
//   const supabase = createClient();
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: 'github',
//     options: {
//       redirectTo: 'http://localhost:3000/auth/callback',
//     },
//   });

//   if (error) {
//     console.error('Error during sign-in:', error.message);
//     redirect('/error');
//   } else {
//     console.log('Successfully signed in with github:', data);
//     // revalidatePath('/', 'layout')
//     // redirect('/')
//   }
// }

// export async function signInWithGoogle() {
//   const supabase = createClient();
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: 'google',
//     options: {
//       redirectTo: process.env.NEXT_PUBLIC_SUPABASE_URL,
//     },
//   });

//   if (error) {
//     console.error('Error during sign-in:', error.message);
//     redirect('/error');
//   } else {
//     console.log('Successfully signed in with Google:', data);
//     // revalidatePath('/', 'layout')
//     // redirect('/')
//   }
// }
