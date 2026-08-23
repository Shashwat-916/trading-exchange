

import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  return (
    <nav className="w-full bg-[#13141a] border-b border-[#22252e] sticky top-0 z-50 px-4 sm:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Brand Logo & Title */}
        <a href="#" className="flex items-center space-x-3 group">
          <BrandLogo size="sm" />
          <span className="text-lg font-bold tracking-tight text-white group-hover:text-slate-200 transition-colors">
            Apex<span className="text-[#e74c3c]">Exchange</span>
          </span>
        </a>

        {/* Right: Login Button */}
        <Button
          className="h-[40px] px-5 bg-[#e74c3c] hover:bg-[#d63827] text-white text-[14px] font-medium rounded-xl transition-colors shadow-md shadow-[#e74c3c]/20"
        >
          Log in
        </Button>
      </div>
    </nav>
  );
}