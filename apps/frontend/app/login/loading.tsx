"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export default function LoginLoading() {
    return (
        <div className="min-h-[calc(100vh-65px)] w-full flex items-center justify-center bg-[#13141a] text-slate-400 font-sans">
            <Loader2 className="w-7 h-7 animate-spin text-[#e74c3c]" />
        </div>
    );
}
