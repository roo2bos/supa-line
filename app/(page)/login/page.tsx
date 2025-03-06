'use client';

import { FaFacebook, FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { Body, Button } from '@/_components';

import {
  login,
  /* signInWithGithub, signInWithGoogle,  */ signup,
} from './actions';
import {
  signInWithFacebook,
  signInWithGithub,
  signInWithGoogle,
} from './oauth';

export default function LoginPage() {
  const cssInput =
    'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50';
  const cssButton =
    'flex w-full justify-center rounded-md bg-indigo-600 border border-gray-300  px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600';

  return (
    <>
      <Body container="default">
        <form className="grid grid-cols-1 gap-5 mt-10">
          <label htmlFor="email">Email:</label>
          <input
            className={`form-input ${cssInput}`}
            id="email"
            name="email"
            type="email"
            // required
            autoComplete="username"
          />
          <label htmlFor="password">Password:</label>
          <input
            className={`form-input ${cssInput}`}
            id="password"
            name="password"
            type="password"
            // required
            autoComplete="current-password"
          />
          <button formAction={login} className={`${cssButton}`}>
            Log in
          </button>
          <button formAction={signup} className={`${cssButton}`}>
            Sign up
          </button>
        </form>

        <p className="flex justify-center gap-10 mt-20">
          <Button onClick={signInWithGithub}>
            <FaGithub className="w-full h-full aspect-square" />
          </Button>
          <Button onClick={signInWithGoogle}>
            <FcGoogle className="w-full h-full aspect-square" />
          </Button>
          <Button onClick={signInWithFacebook}>
            <FaFacebook className="w-full h-full aspect-square" />
          </Button>
        </p>
      </Body>
    </>
  );
}
