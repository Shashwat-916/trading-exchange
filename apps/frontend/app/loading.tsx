"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
    return (
        <div className="min-h-[calc(100vh-65px)] w-full flex flex-col items-center justify-center bg-[#13141a] text-slate-300 gap-3 font-sans">
            <Loader2 className="w-8 h-8 animate-spin text-[#e74c3c]" />
            <span className="text-sm font-medium tracking-wide">Loading Apex Exchange...</span>
        </div>
    );
}
