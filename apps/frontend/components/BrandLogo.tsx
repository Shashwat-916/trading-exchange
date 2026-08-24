import React from "react";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function BrandLogo({ size = "md", className = "" }: BrandLogoProps) {
  const scale = size === "sm" ? "scale-85" : size === "lg" ? "scale-110" : "scale-100";

  return (
    <div className={`relative flex flex-col items-center justify-center pt-1 transition-transform ${scale} ${className}`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3.5 h-3.5 border-2 border-[#e74c3c] rounded-t-md"></div>
      <div className="w-8 h-7 bg-[#e74c3c] rounded-t-full relative z-10"></div>
      <div className="w-10 h-7 bg-[#e74c3c] rounded-b-xl relative z-10"></div>
      <div className="w-6 h-2 bg-[#161822] absolute bottom-3 z-20 rounded-full"></div>
    </div>
  );
}
