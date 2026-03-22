// SignIn — 로그인 페이지
import React, { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { DEMO_ACCOUNTS } from "@/data/mockData";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn, user } = useAuth();
  const [, setLocation] = useLocation();

  // 이미 로그인된 경우 리다이렉트
  React.useEffect(() => {
    if (user) {
      if (user.role === "admin") setLocation("/admin/dashboard");
      else if (user.role === "artist") setLocation("/artist/dashboard");
      else setLocation("/");
    }
  }, [user, setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const success = await signIn(email, password);
    if (!success) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  const handleDemoLogin = async (email: string) => {
    setError("");
    const success = await signIn(email, "demo");
    if (!success) setError("데모 로그인 실패");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* 로고 */}
        <div className="text-center mb-12">
          <div className="font-accent text-[10px] tracking-[0.8em] uppercase text-[#D4A843] mb-2">
            LUMOS
          </div>
          <div className="font-display text-2xl text-[#f5f5f5]">Sign In</div>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-accent text-[10px] tracking-[0.4em] uppercase text-[#909090] block mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/10 px-4 py-3 text-[#f5f5f5] text-sm focus:border-[#D4A843] focus:outline-none transition-colors"
              placeholder="email@example.com"
              required
            />
          </div>
          <div>
            <label className="font-accent text-[10px] tracking-[0.4em] uppercase text-[#909090] block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/10 px-4 py-3 text-[#f5f5f5] text-sm focus:border-[#D4A843] focus:outline-none transition-colors"
              placeholder="password"
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-900/20 p-3 border border-red-900/30">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#D4A843] text-black font-accent text-[10px] tracking-[0.3em] uppercase py-3 hover:bg-[#F0C060] transition-colors"
          >
            Sign In
          </button>
        </form>

        {/* 데모 계정 바로가기 */}
        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="font-accent text-[10px] tracking-[0.4em] uppercase text-[#909090] mb-4 text-center">
            Demo Accounts
          </div>
          <div className="space-y-2">
            {DEMO_ACCOUNTS.map(account => (
              <button
                key={account.email}
                onClick={() => handleDemoLogin(account.email)}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-[#1a1a1a] border border-white/5 hover:border-white/15 transition-colors"
              >
                <span className="text-[#e0e0e0] text-sm">{account.email}</span>
                <span className="font-accent text-[9px] tracking-[0.3em] uppercase text-[#909090]">
                  {account.role}
                </span>
              </button>
            ))}
          </div>
          <p className="text-[#666] text-[10px] text-center mt-3">
            모든 데모 계정 비밀번호: demo
          </p>
        </div>
      </div>
    </div>
  );
}
