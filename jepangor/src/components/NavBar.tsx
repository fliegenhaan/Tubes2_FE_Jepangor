"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="hidden md:flex mr-2">
            <div className="h-8 w-8 relative">
              <div className="absolute inset-0 bg-[var(--primary)] rounded-lg transform rotate-45"></div>
              <div className="absolute inset-1 bg-[var(--accent)] rounded-md transform rotate-12"></div>
              <div className="absolute inset-2 bg-[var(--secondary)] rounded-sm transform rotate-0"></div>
            </div>
          </div>
          <span className={`font-bold text-xl transition-colors duration-300 ${scrolled ? 'text-[var(--primary)]' : 'text-white'}`}>
            Jepangor
          </span>
        </div>
        
        <div className="flex space-x-1">
          <NavLink href="/" active={pathname === "/"}>
            Beranda
          </NavLink>
          <NavLink href="/about" active={pathname === "/about"}>
            Tentang
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-[var(--primary)] text-white"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {children}
    </Link>
  );
}
