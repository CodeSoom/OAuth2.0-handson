'use client';

import { useEffect, useState } from 'react';

import axios from 'axios';

import './main.css';

export default function Home() {
  const [logined, setLogined] = useState(false);
  const [image, setImage] = useState();

  const handleClickLogin = () => {
    window.location.assign('/api/authenticate');
  }

  const handleClickLogout = () => {
    localStorage.removeItem('accessToken');
    setLogined(false);
  }

  const handleClick = async () => {
    try {
      const { data } = await axios.get('/api/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setImage(data.profile);
    } catch (err) {
      if (err.response.status === 401) {
        if (window.confirm('권한이 없습니다. 인가를 하시겠습니까?')) {
          window.location.assign('/api/authorize');
        }
      }
    }
  };

  const handleChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setLogined(true);
    }
  }, []);

  return (
    <main>
      <h1>사진 인화 서비스</h1>

      {logined && (
        <button type="button" onClick={handleClickLogout}>
          로그아웃
        </button>
      )}
      {!logined && (
        <button type="button" onClick={handleClickLogin}>
          로그인
        </button>
      )}

      <p>
        사진을 선택해 주세요.
        <input onChange={handleChange} accept="image/*" type="file" />
      </p>

      <p>
        깃헙 프로필 사진
        {' '}
        <button onClick={handleClick} type="button">불러오기</button>
      </p>

      {image && (
        <div className="box">
          <span style={{ backgroundImage: `url(${image})` }} />
        </div>
      )}
    </main>
  );
}
