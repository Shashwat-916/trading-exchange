"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCw } from "lucide-react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Unhandled App Error:", error);
    }, [error]);

    return (
        <div className="min-h-[calc(100vh-65px)] w-full flex flex-col items-center justify-center bg-[#13141a] text-white p-6 font-sans">
            <div className="max-w-md w-full bg-[#161822] border border-[#26293b] rounded-3xl p-8 text-center space-y-5 shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center mx-auto">
                    <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-bold tracking-tight text-white">
                        Something went wrong
                    </h2>
                    <p className="text-xs text-[#8a8f9e] leading-relaxed">
                        {error.message || "An unexpected error occurred while loading this page."}
                    </p>
                </div>
                <Button
                    onClick={() => reset()}
                    className="w-full h-11 bg-[#e74c3c] hover:bg-[#d63827] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                    <RotateCw className="w-4 h-4" />
                    <span>Try again</span>
                </Button>
            </div>
        </div>
    );
}
