export const metadata = {
  title: 'OAuth2.0 핸즈온',
  description: '코드숨에서 진행하는 OAuth2.0 핸즈온 실습 프로젝트입니다.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
