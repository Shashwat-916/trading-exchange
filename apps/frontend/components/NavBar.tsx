"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { User, LogOut, ShieldCheck, ChevronDown } from "lucide-react";
import { AuthService } from "@/service/auth";

export default function NavBar() {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<{ email: string; id: string } | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const checkAuth = useCallback(() => {
        const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
        if (token) {
            AuthService.getMe(token)
                .then((res) => {
                    if (res.success && res.data) {
                        setUser(res.data);
                    } else {
                        setUser(null);
                    }
                })
                .catch(() => {
                    localStorage.removeItem("auth_token");
                    setUser(null);
                });
        } else {
            setUser(null);
        }
    }, []);

    // Re-check auth whenever route changes
    useEffect(() => {
        checkAuth();
    }, [pathname, checkAuth]);

    // Listen to storage & custom auth change events
    useEffect(() => {
        window.addEventListener("storage", checkAuth);
        window.addEventListener("auth_state_change", checkAuth);
        return () => {
            window.removeEventListener("storage", checkAuth);
            window.removeEventListener("auth_state_change", checkAuth);
        };
    }, [checkAuth]);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        setDropdownOpen(false);
        localStorage.removeItem("auth_token");
        setUser(null);
        if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("auth_state_change"));
        }
        router.push("/");
    };

    const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : "U";

    return (
        <nav className="w-full bg-[#13141a] border-b border-[#22252e] sticky top-0 z-50 px-4 sm:px-8 py-3.5">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Left: Brand Logo & Title */}
                <Link href="/" className="flex items-center space-x-3 group">
                    <BrandLogo size="sm" />
                    <span className="text-lg font-bold tracking-tight text-white group-hover:text-slate-200 transition-colors">
                        Apex<span className="text-[#e74c3c]">Exchange</span>
                    </span>
                </Link>

                {/* Right Actions */}
                <div className="flex items-center space-x-3">
                    {user ? (
                        <div className="relative" ref={dropdownRef}>
                            {/* Profile Avatar Circle Button */}
                            <button
                                type="button"
                                onClick={() => setDropdownOpen((prev) => !prev)}
                                className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#e74c3c] to-amber-500 text-white font-bold text-sm flex items-center justify-center shadow-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer border border-[#26293b] focus:outline-none"
                                aria-expanded={dropdownOpen}
                                aria-label="User profile menu"
                            >
                                {userInitial}
                            </button>

                            {/* Profile Dropdown Menu */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-[#161822] border border-[#26293b] rounded-2xl shadow-2xl py-2 text-left z-50 animate-in fade-in zoom-in-95 duration-150">
                                    {/* Header User Info */}
                                    <div className="px-4 py-3 border-b border-[#222534] space-y-1">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8a8f9e]">Account</span>
                                            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                                                <ShieldCheck className="w-3 h-3" /> Verified
                                            </span>
                                        </div>
                                        <p className="text-xs font-semibold text-slate-100 truncate">{user.email}</p>
                                        <p className="text-[11px] font-mono text-slate-400 truncate">ID: {user.id}</p>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="py-1 px-1">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setDropdownOpen(false);
                                                router.push("/");
                                            }}
                                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-[#1f222e] rounded-xl transition-colors cursor-pointer"
                                        >
                                            <User className="w-4 h-4 text-slate-400" />
                                            <span>Dashboard Profile</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
                                        >
                                            <LogOut className="w-4 h-4 text-red-400" />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Button
                            onClick={() => router.push("/login")}
                            className="h-[40px] px-5 bg-[#e74c3c] hover:bg-[#d63827] text-white text-[14px] font-medium rounded-xl transition-colors shadow-md shadow-[#e74c3c]/20 cursor-pointer"
                        >
                            Login
                        </Button>
                    )}
                </div>
            </div>
        </nav>
    );
}