"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export default function SendOTPLoading() {
    return (
        <div className="min-h-[calc(100vh-65px)] w-full flex flex-col items-center justify-center bg-[#13141a] text-slate-400 gap-3 font-sans">
            <Loader2 className="w-7 h-7 animate-spin text-[#e74c3c]" />
            <span className="text-xs font-medium tracking-wide">Loading OTP verification...</span>
        </div>
    );
}
