import "../styles/global.css";
import { Metadata } from "next";
import Navigation from "../components/navigation"

export const metadata :Metadata = {
  title: {
    template: "%s | Next Movies",
    default: "Loading..."
  },
  description: 'The best movies on th best framework.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
