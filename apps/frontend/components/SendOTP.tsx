"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { BrandLogo } from "@/components/BrandLogo";
import { RotateCw, ArrowLeft } from "lucide-react";

export default function SendOTP() {
    

    return (
        <div className="min-h-[calc(100vh-65px)] w-full flex items-center justify-center bg-[#13141a] p-4 sm:p-6 font-sans">
            {/* Plane Card Container */}
            <Card className="w-full max-w-[420px] bg-[#161822] border border-[#26293b] shadow-xl rounded-3xl">
                <CardHeader className="flex flex-col items-center pt-8 pb-4 space-y-4 text-center">
                    <BrandLogo />
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold text-white tracking-tight">
                            Verify OTP
                        </h1>
                        <p className="text-[#6c7284] text-xs font-normal">
                            We sent a 6-digit verification code to your email
                        </p>
                    </div>
                </CardHeader>

                <CardContent className="space-y-5 px-6 sm:px-8 pb-6">
                    {/* OTP Input */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-semibold text-[#8a8f9e] uppercase tracking-wider">
                            Verification Code
                        </label>
                        <div className="relative">
                            <Input
                                type="text"
                                maxLength={6}
                                placeholder="Enter 6-digit code"
                               
                                className="h-[52px] bg-[#1a1d28] border-[#e74c3c] text-slate-100 placeholder:text-[#5a5f6e] rounded-2xl focus-visible:ring-1 focus-visible:ring-[#e74c3c] focus-visible:border-[#e74c3c] px-4 text-center text-lg tracking-widest font-semibold"
                            />
                            
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button className="w-full h-[48px] bg-[#e74c3c] hover:bg-[#d63827] text-white text-[15px] font-semibold rounded-2xl transition-all shadow-lg shadow-[#e74c3c]/20 active:scale-[0.99]">
                        Verify & Continue
                    </Button>

                    {/* Resend Action */}
                    <div className="flex justify-center pt-1">
                        <button type="button" className="inline-flex items-center gap-1.5 text-[#e74c3c] font-medium text-[13px] hover:underline transition-all">
                            <RotateCw className="w-3.5 h-3.5" />
                            <span>Resend code (05:00)</span>
                        </button>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-center border-t border-[#222534] py-4 px-6 sm:px-8 rounded-b-3xl">
                    <button type="button" className="text-[#d8b4fe] font-medium text-[14px] hover:text-[#e9d5ff] transition-colors flex items-center gap-1.5">
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back to Login</span>
                    </button>
                </CardFooter>
            </Card>
        </div>
    );
}