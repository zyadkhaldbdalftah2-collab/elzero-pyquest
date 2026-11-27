import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: {
    default: "PyVerse Academy – Master Python with Osama Elzero",
    template: "%s | PyVerse Academy",
  },
  description:
    "PyVerse Academy is an interactive bilingual learning platform for Osama Elzero's Mastering Python course. 152 lessons, 10 mini-games per lesson, gamification, Python Studio IDE, and AI-powered content.",
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
