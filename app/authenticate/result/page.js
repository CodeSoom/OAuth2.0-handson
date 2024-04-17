'use client';

import { useEffect } from "react";

import axios from 'axios';

import { useSearchParams } from "next/navigation"

let called = false;

export default function AuthResultPage() {
  const params = useSearchParams();

  useEffect(() => {
    if (called) {
      return;
    }
    called = true;

    const code = params.get('code');
    const state = params.get('state');
    axios.post('/api/authenticate/token', { code, state })
    .then(({data}) => {
      localStorage.setItem('accessToken', data.accessToken);
      window.location.assign('/');
    })
    .catch((err) => {
      console.error(err);
    });
  }, []);

  return (
    <div>
      ...로그인 중
    </div>
  )
}