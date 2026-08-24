"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { BrandLogo } from "@/components/BrandLogo";
import { useRouter } from "next/navigation";
import { AuthService } from "@/service/auth";
import { Loader2, AlertCircle } from "lucide-react";

export default function CreateAccount() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [checkingSession, setCheckingSession] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Auto-redirect if user is already logged in
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

    const validateEmail = (emailStr: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(emailStr.trim());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const trimmedEmail = email.trim();
        if (!trimmedEmail) {
            setError("Please enter your email address.");
            return;
        }

        if (!validateEmail(trimmedEmail)) {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true);

        try {
            const res = await AuthService.signup(trimmedEmail);
            const msg = (res.message || "").toLowerCase();

            // If user is already verified/exists, backend returns logged in response directly
            if (msg.includes("already exists") || msg.includes("logged in")) {
                if (res.token) {
                    localStorage.setItem("auth_token", res.token);
                    if (typeof window !== "undefined") {
                        window.dispatchEvent(new Event("auth_state_change"));
                    }
                }
                router.push("/");
                return;
            }

            if (res.token) {
                localStorage.setItem("temp_auth_token", res.token);
            }
            if (typeof window !== "undefined") {
                sessionStorage.setItem("user_email", trimmedEmail);
            }
            router.push(`/send-otp?email=${encodeURIComponent(trimmedEmail)}`);
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to send OTP code. Please try again.";
            setError(msg);
        } finally {
            setLoading(false);
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
            {/* Main Card Container */}
            <Card className="w-full max-w-[420px] bg-[#161822] border border-[#26293b] shadow-xl rounded-3xl">
                <CardHeader className="flex flex-col items-center pt-8 pb-4 space-y-4 text-center">
                    <BrandLogo />
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold text-white tracking-tight">
                            Sign In / Create Account
                        </h1>
                        <p className="text-[#6c7284] text-xs font-normal">
                            Enter your email address to receive a secure login code
                        </p>
                    </div>
                </CardHeader>

                <CardContent className="px-6 sm:px-8 pb-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label htmlFor="email-input" className="text-[11px] font-semibold text-[#8a8f9e] uppercase tracking-wider block">
                                Email Address
                            </label>
                            <div className="relative">
                                <Input
                                    id="email-input"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (error) setError(null);
                                    }}
                                    disabled={loading}
                                    className={`h-[52px] bg-[#1a1d28] text-slate-100 placeholder:text-[#5a5f6e] rounded-2xl focus-visible:ring-1 focus-visible:ring-[#e74c3c] px-4 text-sm transition-all ${
                                        error ? "border-red-500 focus-visible:border-red-500" : "border-[#26293b] focus-visible:border-[#e74c3c]"
                                    }`}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-[48px] bg-[#e74c3c] hover:bg-[#d63827] text-white text-[15px] font-semibold rounded-2xl transition-all shadow-lg shadow-[#e74c3c]/20 active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Verifying Email...</span>
                                </>
                            ) : (
                                "Continue with Email"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
