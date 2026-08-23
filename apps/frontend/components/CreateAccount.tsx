"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { BrandLogo } from "@/components/BrandLogo";
import { useRouter } from "next/navigation";

export default function CreateAccount() {

    const router = useRouter()

    return (
        <div className="min-h-[calc(100vh-65px)] w-full flex items-center justify-center bg-[#13141a] p-4 sm:p-6 font-sans">
            {/* Plane Card Container */}
            <Card className="w-full max-w-[420px] bg-[#161822] border border-[#26293b] shadow-xl rounded-3xl">
                <CardHeader className="flex flex-col items-center pt-8 pb-4 space-y-4 text-center">
                    <BrandLogo />
                    <div className="space-y-1">
                        <h1 className="text-2xl font-semibold text-white tracking-tight">
                            Create Account
                        </h1>
                        <p className="text-[#6c7284] text-xs font-normal">
                            Enter your email address to receive a secure login code
                        </p>
                    </div>
                </CardHeader>

                <CardContent className="space-y-5 px-6 sm:px-8 pb-8">
                    {/* Email Input */}
                    <div className="space-y-2">
                        
                        <label className="text-[11px] font-semibold text-[#8a8f9e] uppercase tracking-wider  ">
                            Email Address
                        </label>
                        <br /><br />
                        <div className="relative">
                            <Input
                                type="email"
                                placeholder="name@example.com"
                             
                                className="h-[52px] bg-[#1a1d28] border-[#e74c3c] text-slate-100 placeholder:text-[#5a5f6e] rounded-2xl focus-visible:ring-1 focus-visible:ring-[#e74c3c] focus-visible:border-[#e74c3c] px-4 text-sm transition-all"
                            />
                            
                        </div>
                    </div>
                    <br />
                    {/* Submit Button */}
                    <Button className="w-full h-[48px] bg-[#e74c3c] hover:bg-[#d63827] text-white text-[15px] font-semibold rounded-2xl transition-all shadow-lg shadow-[#e74c3c]/20 active:scale-[0.99]"
                    onClick={()=>router.push('/api/send-otp')}
                    >
                        Continue with Email
                    </Button>
                </CardContent>
            </Card>
        </div>
    );

}

