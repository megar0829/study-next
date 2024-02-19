

export const metadata = {
  title: "JeongSik's Portfolio",
  description: "프론트엔드 개발자가 되고 싶은 배정식 입니다.",
  keywords: ["포트폴리오", "리액트", "넥스트", "portfolio", "react.js", "next.js"],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
