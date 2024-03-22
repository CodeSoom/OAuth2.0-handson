'use client';

import { useState } from 'react';

import './main.css';

export default function Home() {
  const [image, setImage] = useState();

  const handleClick = async () => {
  };

  const handleChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <main>
      <h1>사진 인화 서비스</h1>

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
