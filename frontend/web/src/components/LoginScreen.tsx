import React, { useState } from "react";
import { ArrowRight, Globe2, Lock, Mail, ShieldCheck, User } from "lucide-react";
import { apiClient } from "@/api/client";
import { PlatformBrandLogo } from "./brand/PlatformBrandLogo";
import { appConfig } from "@/config/appConfig";
import { brandColors, uiStyles } from "@/config/designSystem";
import { uiStrings } from "@/config/uiStrings";

export type AuthMode = "login" | "signup";

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyUrl, setCompanyUrl] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const targetUser = username.trim();
      const response = await apiClient.login(targetUser, password);
      localStorage.setItem("aiseo_auth_token", response.token);
      onLogin();
    } catch (errorContext: any) {
      setAuthError(
        errorContext.message || "Authentication failed. Please verify your credentials."
      );
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div
      style={{ backgroundColor: brandColors.pageBg }}
      className="min-h-screen text-slate-900 font-sans flex flex-col justify-center items-center px-4 sm:px-6 py-12 relative selection:bg-black selection:text-white"
    >
      <div className="w-full max-w-md space-y-6">
        {/* Brand Logo & Headline */}
        <div className="text-center space-y-2">
          <div className="flex justify-center pb-2">
            <PlatformBrandLogo
              size={42}
              brandText={appConfig.brandName}
              textClassName="text-2xl font-bold tracking-tight text-slate-900 font-sans"
            />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {mode === "login"
              ? uiStrings.auth.loginTitle
              : uiStrings.auth.signupTitle}
          </h1>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {mode === "login"
              ? uiStrings.auth.loginSubtitle
              : uiStrings.auth.signupSubtitle}
          </p>
        </div>

        {/* Auth Card Container */}
        <div
          style={{
            backgroundColor: brandColors.windowBg,
            borderColor: brandColors.windowBorder,
          }}
          className="rounded-3xl border p-7 sm:p-8 shadow-xl space-y-6 relative"
        >
          {/* Segmented Mode Switcher */}
          <div
            style={{ backgroundColor: brandColors.iconBg, borderColor: brandColors.windowBorder }}
            className="flex p-1 rounded-xl border"
          >
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setAuthError("");
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === "login"
                  ? uiStyles.segmented.primaryActive
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {uiStrings.auth.buttons.switchModeToSignIn}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setAuthError("");
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === "signup"
                  ? uiStyles.segmented.primaryActive
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {uiStrings.auth.buttons.switchModeToSignUp}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {authError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-medium text-center">
                {authError}
              </div>
            )}

            {mode === "signup" && (
              <>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    {uiStrings.auth.labels.fullName}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      placeholder={uiStrings.auth.placeholders.fullName}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-black focus:ring-2 focus:ring-black/10 transition-all font-sans"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    {uiStrings.auth.labels.companyWebsite}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Globe2 className="w-4 h-4" />
                    </div>
                    <input
                      type="url"
                      value={companyUrl}
                      onChange={(event) => setCompanyUrl(event.target.value)}
                      placeholder={uiStrings.auth.placeholders.companyWebsite}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-black focus:ring-2 focus:ring-black/10 transition-all font-sans"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                {uiStrings.auth.labels.workEmail}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder={uiStrings.auth.placeholders.workEmail}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-black focus:ring-2 focus:ring-black/10 transition-all font-sans"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                {uiStrings.auth.labels.password}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={uiStrings.auth.placeholders.password}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-black focus:ring-2 focus:ring-black/10 transition-all font-sans"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className={`w-full py-3 ${uiStyles.button.primary}`}
            >
              <span>
                {authLoading
                  ? uiStrings.auth.buttons.submitting
                  : mode === "login"
                  ? uiStrings.auth.buttons.signIn
                  : uiStrings.auth.buttons.signUp}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer Terms & Security Notice */}
          <div className="pt-2 text-center space-y-2 border-t border-slate-200/60">
            <p className="text-[11px] text-slate-500">
              {uiStrings.auth.notices.termsAgreement}
            </p>
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{uiStrings.auth.notices.securityBadge}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
