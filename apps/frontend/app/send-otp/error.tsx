"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCw } from "lucide-react";

export default function SendOTPError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("SendOTP Route Error:", error);
    }, [error]);

    return (
        <div className="min-h-[calc(100vh-65px)] w-full flex items-center justify-center bg-[#13141a] p-4 font-sans">
            <div className="max-w-[400px] w-full bg-[#161822] border border-[#26293b] rounded-3xl p-6 text-center space-y-4 shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mx-auto">
                    <AlertCircle className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white">Verification Error</h3>
                    <p className="text-xs text-[#8a8f9e]">
                        {error.message || "Failed to load OTP verification screen."}
                    </p>
                </div>
                <Button
                    onClick={() => reset()}
                    className="w-full h-10 bg-[#e74c3c] hover:bg-[#d63827] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Try again</span>
                </Button>
            </div>
        </div>
    );
}
