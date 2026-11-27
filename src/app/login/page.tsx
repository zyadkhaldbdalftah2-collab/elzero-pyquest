"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Code2,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  Loader2,
  Sparkles,
  Settings,
  Check,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { signInWithEmail, signInWithGoogle, isConfigured } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Manual Supabase credentials config fallback
  const [showConfig, setShowConfig] = useState(!isConfigured);
  const [customUrl, setCustomUrl] = useState("");
  const [customKey, setCustomKey] = useState("");
  const [configSaved, setConfigSaved] = useState(false);

  useEffect(() => {
    document.title = "Sign In | PyVerse Academy";
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setErrorMsg(null);

    const { error } = await signInWithEmail(email, password);
    if (error) {
      setErrorMsg(error);
      setLoading(false);
    } else {
      router.push("/");
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMsg(null);
    const { error } = await signInWithGoogle();
    if (error) {
      setErrorMsg(error);
      setLoading(false);
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (customUrl.trim() && customKey.trim()) {
      localStorage.setItem("elzero_supabase_url", customUrl.trim());
      localStorage.setItem("elzero_supabase_anon_key", customKey.trim());
      setConfigSaved(true);
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Logo */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-python-blue to-python-yellow flex items-center justify-center p-0.5 shadow-lg shadow-python-blue/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-python-yellow group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              <span>PyVerse</span>
              <span className="text-python-yellow font-extrabold">Academy</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Sign in to your account
          </h1>
          <p className="text-xs text-slate-400">
            Sync your progress across Osama Elzero&apos;s Mastering Python course &amp; climb the leaderboard
          </p>
        </div>

        {/* Supabase Not Configured Notice */}
        {!isConfigured && (
          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-900/50 text-xs text-amber-200 space-y-3 shadow-md">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-python-yellow shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Running in Local Storage Mode:</span>
                <p className="text-slate-300 mt-1 leading-relaxed">
                  Supabase environment variables (<code>NEXT_PUBLIC_SUPABASE_URL</code> & <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>) are not set. Your progress is currently stored locally in your browser.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowConfig(!showConfig)}
              className="flex items-center gap-1 text-[11px] font-semibold text-python-yellow hover:underline"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{showConfig ? "Hide Setup Form" : "Connect Supabase Project (Optional)"}</span>
            </button>

            {showConfig && (
              <form onSubmit={handleSaveConfig} className="space-y-2 pt-2 border-t border-amber-900/40">
                <div>
                  <label className="text-[10px] font-mono text-slate-400">Project URL:</label>
                  <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://xyz.supabase.co"
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-slate-200 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-slate-400">Anon Public Key:</label>
                  <input
                    type="text"
                    value={customKey}
                    onChange={(e) => setCustomKey(e.target.value)}
                    placeholder="eyJhbGci..."
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-slate-200 focus:outline-none"
                    required
                  />
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-400">Saved in browser localStorage</span>
                  <button
                    type="submit"
                    className="px-3 py-1 bg-python-yellow hover:bg-yellow-400 text-slate-950 font-bold rounded-lg text-xs transition-colors"
                  >
                    {configSaved ? "Saved!" : "Save & Connect"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Card Form */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-900/50 text-xs text-red-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading || !isConfigured}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 border border-slate-700 rounded-xl text-xs font-semibold text-white transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-slate-900 px-3 text-[11px] font-mono text-slate-500 uppercase">
              Or with email
            </span>
            <div className="border-t border-slate-800 w-full" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Email address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="developer@example.com"
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-python-blue transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-python-blue transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !isConfigured}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-python-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md shadow-python-blue/20 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer links */}
        <div className="text-center text-xs text-slate-400 space-y-2">
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-python-yellow hover:underline font-semibold"
            >
              Sign up
            </Link>
          </p>
          <p>
            <Link href="/" className="hover:text-slate-200 transition-colors">
              ← Return to Course Hub
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
