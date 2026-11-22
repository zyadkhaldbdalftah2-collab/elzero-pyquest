import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Elzero PyQuest – Master Python with Osama Elzero",
  description:
    "An interactive bilingual learning platform for Osama Elzero's Mastering Python course. 152 lessons, 10 mini-games per lesson, gamification, and AI-powered content.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-200 font-inter antialiased min-h-screen">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
