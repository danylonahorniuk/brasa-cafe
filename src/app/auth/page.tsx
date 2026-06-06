"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, User, Sparkles, Gift } from "lucide-react";
import { useLang } from "@/context/LangContext";

type Tab = "signin" | "signup";
type State = "idle" | "loading" | "done";

export default function AuthPage() {
  const { t } = useLang();
  const [tab, setTab]         = useState<Tab>("signin");
  const [state, setState]     = useState<State>("idle");
  const [showPass, setShowPass]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setTimeout(() => setState("done"), 900);
  };

  /* ── "Coming soon" screen ── */
  if (state === "done") {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ background: "#1a1208" }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
          style={{ background: "rgba(196,154,60,0.12)", border: "1px solid rgba(196,154,60,0.3)" }}
        >
          <Sparkles size={28} style={{ color: "#c49a3c" }} />
        </div>

        <h2
          className="text-4xl mb-3"
          style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 300, color: "#e8ddd4" }}
        >
          {t("auth.comingSoonTitle")}
        </h2>
        <p className="text-sm leading-relaxed max-w-xs mb-10" style={{ color: "rgba(255,255,255,0.45)" }}>
          {t("auth.comingSoonText")}
        </p>

        {/* Бонусна картка */}
        <div
          className="w-full max-w-xs rounded-sm p-5 mb-8 text-left"
          style={{
            background: "linear-gradient(135deg, rgba(139,26,46,0.25) 0%, rgba(196,154,60,0.1) 100%)",
            border: "1px solid rgba(196,154,60,0.2)",
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Gift size={14} style={{ color: "#c49a3c" }} />
            <span className="text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: "#c49a3c" }}>
              {t("auth.bonusTitle")}
            </span>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            {t("auth.bonusText")}
          </p>
        </div>

        <Link
          href="/"
          className="text-[0.65rem] tracking-[0.15em] uppercase transition-colors"
          style={{ color: "rgba(255,255,255,0.35)" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#c49a3c")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.35)")}
        >
          {t("auth.backHome")}
        </Link>
      </div>
    );
  }

  /* ── Main auth form ── */
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5 py-16"
      style={{ background: "#1a1208" }}
    >
      {/* Logo */}
      <Link href="/" className="flex flex-col items-center mb-10">
        <span
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "2rem",
            fontWeight: 400,
            letterSpacing: "0.22em",
            color: "#e8ddd4",
          }}
        >
          BRASA
        </span>
      </Link>

      {/* Card */}
      <div
        className="w-full max-w-sm rounded-sm"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Tabs */}
        <div className="flex" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          {(["signin", "signup"] as Tab[]).map((t_) => (
            <button
              key={t_}
              onClick={() => { setTab(t_); setState("idle"); }}
              className="flex-1 py-4 text-[0.62rem] tracking-[0.15em] uppercase transition-all duration-200 relative"
              style={{
                color: tab === t_ ? "#e8ddd4" : "rgba(255,255,255,0.3)",
                background: "transparent",
              }}
            >
              {t_ === "signin" ? t("auth.tabSignIn") : t("auth.tabSignUp")}
              {tab === t_ && (
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
                  style={{ width: "24px", height: "2px", background: "#c49a3c" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">

          {/* Name (signup only) */}
          {tab === "signup" && (
            <FieldWrapper icon={<User size={14} />}>
              <input
                type="text"
                placeholder={t("auth.namePlaceholder")}
                required
                className="auth-input"
              />
              <FieldLabel>{t("auth.name")}</FieldLabel>
            </FieldWrapper>
          )}

          {/* Email */}
          <FieldWrapper icon={<Mail size={14} />}>
            <input
              type="email"
              placeholder={t("auth.emailPlaceholder")}
              required
              className="auth-input"
            />
            <FieldLabel>{t("auth.email")}</FieldLabel>
          </FieldWrapper>

          {/* Password */}
          <FieldWrapper
            icon={<Lock size={14} />}
            right={
              <button type="button" onClick={() => setShowPass((v) => !v)} className="auth-eye-btn">
                {showPass ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
            }
          >
            <input
              type={showPass ? "text" : "password"}
              placeholder={t("auth.passwordPlaceholder")}
              required
              minLength={6}
              className="auth-input pr-8"
            />
            <FieldLabel>{t("auth.password")}</FieldLabel>
          </FieldWrapper>

          {/* Confirm password (signup only) */}
          {tab === "signup" && (
            <FieldWrapper
              icon={<Lock size={14} />}
              right={
                <button type="button" onClick={() => setShowConfirm((v) => !v)} className="auth-eye-btn">
                  {showConfirm ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
              }
            >
              <input
                type={showConfirm ? "text" : "password"}
                placeholder={t("auth.confirmPlaceholder")}
                required
                minLength={6}
                className="auth-input pr-8"
              />
              <FieldLabel>{t("auth.confirmPassword")}</FieldLabel>
            </FieldWrapper>
          )}

          {/* Forgot password */}
          {tab === "signin" && (
            <div className="flex justify-end -mt-1">
              <button
                type="button"
                className="text-[0.58rem] tracking-wider uppercase transition-colors"
                style={{ color: "rgba(255,255,255,0.25)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#c49a3c")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.25)")}
                onClick={() => setState("done")}
              >
                {t("auth.forgotPassword")}
              </button>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={state === "loading"}
            className="mt-2 py-3.5 rounded-sm text-[0.65rem] tracking-[0.18em] uppercase transition-all duration-300 flex items-center justify-center gap-2"
            style={{
              background: state === "loading"
                ? "rgba(139,26,46,0.5)"
                : "linear-gradient(135deg, #a02030 0%, #8b1a2e 100%)",
              color: "#fff",
              boxShadow: state === "loading" ? "none" : "0 4px 16px rgba(139,26,46,0.35)",
            }}
          >
            {state === "loading" ? (
              <span className="auth-spinner" />
            ) : (
              tab === "signin" ? t("auth.signInBtn") : t("auth.signUpBtn")
            )}
          </button>

          {/* Switch tab hint */}
          <p className="text-center text-[0.58rem]" style={{ color: "rgba(255,255,255,0.25)" }}>
            {tab === "signin" ? t("auth.noAccount") : t("auth.hasAccount")}
            {" "}
            <button
              type="button"
              onClick={() => setTab(tab === "signin" ? "signup" : "signin")}
              className="transition-colors"
              style={{ color: "#c49a3c" }}
            >
              {tab === "signin" ? t("auth.signUpLink") : t("auth.signInLink")}
            </button>
          </p>
        </form>
      </div>

      <style>{`
        .auth-input {
          width: 100%;
          background: transparent;
          color: #e8ddd4;
          font-size: 0.85rem;
          padding: 18px 12px 6px 36px;
          outline: none;
          border: none;
        }
        .auth-input::placeholder { color: rgba(255,255,255,0.2); }
        .auth-input:-webkit-autofill,
        .auth-input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 100px #221608 inset !important;
          -webkit-text-fill-color: #e8ddd4 !important;
        }
        .auth-eye-btn {
          color: rgba(255,255,255,0.25);
          transition: color 0.2s;
          padding: 4px;
        }
        .auth-eye-btn:hover { color: rgba(255,255,255,0.6); }
        .auth-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.2);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

/* ── Helper components ── */

function FieldWrapper({
  icon,
  right,
  children,
}: {
  icon: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      className="auth-field relative flex items-center rounded-sm"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        transition: "border-color 0.2s",
      }}
    >
      <span
        className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: "rgba(255,255,255,0.25)" }}
      >
        {icon}
      </span>
      <div className="flex-1 relative">{children}</div>
      {right && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2">{right}</span>
      )}

      <style>{`
        .auth-field:focus-within {
          border-color: rgba(196,154,60,0.4) !important;
        }
        .auth-field:focus-within span:first-child {
          color: rgba(196,154,60,0.7);
        }
      `}</style>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="absolute top-1.5 left-9 text-[0.48rem] tracking-[0.15em] uppercase pointer-events-none"
      style={{ color: "rgba(255,255,255,0.25)" }}
    >
      {children}
    </span>
  );
}
