"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { BrandLogo } from "@/components/BrandLogo";
import { RotateCw, ArrowLeft, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthService } from "@/service/auth";

export default function SendOTP() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [email, setEmail] = useState<string>("");
    const [otp, setOtp] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [checkingSession, setCheckingSession] = useState<boolean>(true);
    const [isResending, setIsResending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [timer, setTimer] = useState<number>(60); // 60 seconds cooldown for resend

    // Auto-redirect if user is already verified / logged in
    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        if (token) {
            AuthService.getMe(token)
                .then((res) => {
                    if (res.success && res.data) {
                        router.push("/");
                    } else {
                        setCheckingSession(false);
                    }
                })
                .catch(() => {
                    localStorage.removeItem("auth_token");
                    setCheckingSession(false);
                });
        } else {
            setCheckingSession(false);
        }
    }, [router]);

    useEffect(() => {
        const emailFromParam = searchParams?.get("email");
        if (emailFromParam) {
            setEmail(emailFromParam);
        } else if (typeof window !== "undefined") {
            const storedEmail = sessionStorage.getItem("user_email");
            if (storedEmail) {
                setEmail(storedEmail);
            }
        }
    }, [searchParams]);

    // Timer countdown effect
    useEffect(() => {
        if (timer <= 0) return;
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const formatTimer = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleVerify = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setError(null);
        setSuccessMsg(null);

        if (!otp || otp.trim().length !== 6) {
            setError("Please enter the complete 6-digit verification code.");
            return;
        }

        if (!email) {
            setError("Email address missing. Please go back and re-enter your email.");
            return;
        }

        setLoading(true);

        try {
            const res = await AuthService.verifyOtp(email, otp.trim());
            if (res.token) {
                localStorage.setItem("auth_token", res.token);
                localStorage.removeItem("temp_auth_token");
                if (typeof window !== "undefined") {
                    window.dispatchEvent(new Event("auth_state_change"));
                }
            }
            setSuccessMsg("Email verified successfully! Redirecting...");
            setTimeout(() => {
                router.push("/");
            }, 1200);
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to verify OTP. Please try again.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (isResending || timer > 0) return;
        if (!email) {
            setError("Email address missing. Please go back to enter your email.");
            return;
        }

        setError(null);
        setSuccessMsg(null);
        setIsResending(true);

        try {
            const res = await AuthService.resendOtp(email);
            const msg = res.message || (res as any).messsage || "A new verification code has been sent to your email.";
            
            if (msg.toLowerCase().includes("already verified")) {
                setSuccessMsg("User already verified! Redirecting...");
                setTimeout(() => {
                    router.push("/");
                }, 1000);
                return;
            }

            setSuccessMsg(msg);
            setTimer(60); // Reset 60s timer
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to resend verification code.";
            setError(msg);
        } finally {
            setIsResending(false);
        }
    };

    if (checkingSession) {
        return (
            <div className="min-h-[calc(100vh-65px)] w-full flex items-center justify-center bg-[#13141a] text-slate-400 font-sans">
                <Loader2 className="w-7 h-7 animate-spin text-[#e74c3c]" />
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-65px)] w-full flex items-center justify-center bg-[#13141a] p-4 sm:p-6 font-sans">
            {/* Card Container */}
            <Card className="w-full max-w-[420px] bg-[#161822] border border-[#26293b] shadow-xl rounded-3xl">
                <CardHeader className="flex flex-col items-center pt-8 pb-4 space-y-4 text-center">
                    <BrandLogo />
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold text-white tracking-tight">
                            Verify OTP
                        </h1>
                        <p className="text-[#6c7284] text-xs font-normal">
                            We sent a 6-digit verification code to{" "}
                            <span className="text-slate-200 font-medium">{email || "your email"}</span>
                        </p>
                    </div>
                </CardHeader>

                <CardContent className="space-y-5 px-6 sm:px-8 pb-6">
                    <form onSubmit={handleVerify} className="space-y-5">
                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {successMsg && (
                            <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs">
                                <CheckCircle2 className="w-4 h-4 shrink-0" />
                                <span>{successMsg}</span>
                            </div>
                        )}

                        {/* OTP Input */}
                        <div className="space-y-2">
                            <label htmlFor="otp-input" className="text-[11px] font-semibold text-[#8a8f9e] uppercase tracking-wider block">
                                Verification Code
                            </label>
                            <div className="relative">
                                <Input
                                    id="otp-input"
                                    type="text"
                                    maxLength={6}
                                    placeholder="Enter 6-digit code"
                                    value={otp}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/[^0-9]/g, "");
                                        setOtp(val);
                                        if (error) setError(null);
                                    }}
                                    disabled={loading}
                                    className={`h-[52px] bg-[#1a1d28] text-slate-100 placeholder:text-[#5a5f6e] rounded-2xl focus-visible:ring-1 focus-visible:ring-[#e74c3c] px-4 text-center text-lg tracking-widest font-semibold transition-all ${
                                        error ? "border-red-500 focus-visible:border-red-500" : "border-[#26293b] focus-visible:border-[#e74c3c]"
                                    }`}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={loading || otp.length !== 6}
                            className="w-full h-[48px] bg-[#e74c3c] hover:bg-[#d63827] text-white text-[15px] font-semibold rounded-2xl transition-all shadow-lg shadow-[#e74c3c]/20 active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Verifying...</span>
                                </>
                            ) : (
                                "Verify & Continue"
                            )}
                        </Button>
                    </form>

                    {/* Resend Action */}
                    <div className="flex justify-center pt-1">
                        <button
                            type="button"
                            onClick={handleResend}
                            disabled={timer > 0 || isResending}
                            className={`inline-flex items-center gap-1.5 text-[13px] font-medium transition-all ${
                                timer > 0 || isResending
                                    ? "text-[#5a5f6e] cursor-not-allowed"
                                    : "text-[#e74c3c] hover:underline cursor-pointer"
                            }`}
                        >
                            <RotateCw className={`w-3.5 h-3.5 ${isResending ? "animate-spin" : ""}`} />
                            <span>
                                {isResending
                                    ? "Resending..."
                                    : timer > 0
                                    ? `Resend code (${formatTimer(timer)})`
                                    : "Resend code"}
                            </span>
                        </button>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-center border-t border-[#222534] py-4 px-6 sm:px-8 rounded-b-3xl">
                    <button
                        type="button"
                        onClick={() => router.push("/create-account")}
                        className="text-[#d8b4fe] font-medium text-[14px] hover:text-[#e9d5ff] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back to Create Account</span>
                    </button>
                </CardFooter>
            </Card>
        </div>
    );
}