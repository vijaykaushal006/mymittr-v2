"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userName, setUserName] = useState<string>("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect logged-in user and get profile
  useEffect(() => {
    const supabase = createClient();
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);

        // Get user's full name from profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", session.user.id)
          .single();

        if (profile?.full_name) {
          setUserName(profile.full_name);
        } else if (session.user.user_metadata?.full_name) {
          setUserName(session.user.user_metadata.full_name);
        } else if (session.user.user_metadata?.name) {
          setUserName(session.user.user_metadata.name);
        } else {
          setUserName(session.user.email?.split("@")[0] || "User");
        }
      } else {
        setUser(null);
        setUserName("");
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);

        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("id", session.user.id)
          .single();

        if (profile?.full_name) {
          setUserName(profile.full_name);
        } else if (session.user.user_metadata?.full_name) {
          setUserName(session.user.user_metadata.full_name);
        } else if (session.user.user_metadata?.name) {
          setUserName(session.user.user_metadata.name);
        } else {
          setUserName(session.user.email?.split("@")[0] || "User");
        }
      } else {
        setUser(null);
        setUserName("");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    try {
      const supabase = createClient();

      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error('Logout error:', error);
      }

      // Clear local state
      setUser(null);
      setUserName("");
      setUserDropdownOpen(false);

      // Clear any cached data
      if (typeof window !== 'undefined') {
        // Clear localStorage
        localStorage.clear();
        // Clear sessionStorage
        sessionStorage.clear();
      }

      // Force router refresh and redirect
      router.refresh();
      router.push("/");

      // Force page reload to clear all state
      setTimeout(() => {
        window.location.href = "/";
      }, 100);
    } catch (error) {
      console.error('Logout failed:', error);
      // Force redirect even if error
      window.location.href = "/";
    }
  }

  const serviceLinks = [
    {
      name: "Jobs for You",
      path: "/services/jobs",
      icon: "💼",
      description: "Find senior-friendly opportunities"
    },
    {
      name: "Health & Wellness",
      path: "/services/health",
      icon: "🏥",
      description: "Healthcare and fitness services"
    },
    {
      name: "Companionship",
      path: "/services/companionship",
      icon: "🤝",
      description: "Connect with friends and volunteers"
    },
    {
      name: "Medical Services",
      path: "/services/medical",
      icon: "⚕️",
      description: "Professional medical care"
    },
    {
      name: "Emergency Help",
      path: "/services/emergency",
      icon: "🚨",
      description: "24/7 emergency assistance"
    },
    {
      name: "Mittr Community",
      path: "/services/community",
      icon: "👥",
      description: "Join our vibrant community"
    },
  ];

  const mainLinks = [
    { name: "Home", path: "/" },
    { name: "Vision", path: "/vision" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setUserDropdownOpen(false);
    };

    if (userDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [userDropdownOpen]);

  return (
    <>
      <header className="fixed top-0 w-full z-50 flex justify-center transition-all duration-500">
        <div
          className={`transition-all duration-300 w-[95%] max-w-7xl mt-4
          ${scrolled
              ? "bg-white/95 backdrop-blur-lg shadow-xl py-3 rounded-2xl border border-gray-200"
              : "bg-white/90 backdrop-blur-md py-5 rounded-[2rem] shadow-lg"
            } 
          px-6 md:px-8 flex items-center justify-between`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1e4d45] to-[#2d7566] text-white rounded-xl flex items-center justify-center font-bold text-xl transition-all group-hover:scale-110 group-hover:rotate-3 shadow-md">
              M
            </div>
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-[#1e4d45] to-[#2d7566] bg-clip-text text-transparent">
              MyMittr
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {mainLinks.slice(0, 2).map((link) => {
              const isActive =
                link.path === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.path);

              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`px-4 py-2 text-sm font-semibold transition-all rounded-xl ${isActive
                    ? "text-[#1e4d45] bg-[#e6f0ed]"
                    : "text-gray-600 hover:text-[#1e4d45] hover:bg-gray-50"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Services Dropdown */}
            <div className="relative group py-2">
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-600 transition-all rounded-xl group-hover:text-[#1e4d45] group-hover:bg-gray-50">
                Services
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute top-full left-0 w-80 bg-white shadow-2xl rounded-2xl p-3 border border-gray-100 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="grid gap-1">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.name}
                      href={service.path}
                      className="flex items-start gap-3 px-4 py-3 text-sm rounded-xl hover:bg-[#e6f0ed] transition-colors group/item"
                    >
                      <span className="text-2xl">{service.icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 group-hover/item:text-[#1e4d45]">
                          {service.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {service.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {mainLinks.slice(2).map((link) => {
              const isActive = pathname.startsWith(link.path);

              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`px-4 py-2 text-sm font-semibold transition-all rounded-xl ${isActive
                    ? "text-[#1e4d45] bg-[#e6f0ed]"
                    : "text-gray-600 hover:text-[#1e4d45] hover:bg-gray-50"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Side - User Actions */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {/* Desktop User Menu */}
                <div className="hidden lg:block relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setUserDropdownOpen(!userDropdownOpen);
                    }}
                    className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 bg-gradient-to-br from-[#1e4d45] to-[#2d7566] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {userName.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-semibold text-gray-800">
                          Hi, {userName.split(" ")[0]}
                        </div>
                      </div>
                    </div>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* User Dropdown */}
                  {userDropdownOpen && (
                    <div className="absolute top-full right-0 w-64 bg-white shadow-2xl rounded-2xl p-2 border border-gray-100 mt-2">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="font-semibold text-gray-800">{userName}</div>
                        <div className="text-sm text-gray-500 truncate">{user.email}</div>
                      </div>

                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#e6f0ed] hover:text-[#1e4d45] rounded-xl transition-colors mt-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        My Profile
                      </Link>

                      <Link
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#e6f0ed] hover:text-[#1e4d45] rounded-xl transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </Link>

                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile User Avatar */}
                <button
                  className="lg:hidden w-10 h-10 bg-gradient-to-br from-[#1e4d45] to-[#2d7566] rounded-full flex items-center justify-center text-white font-bold shadow-md"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {userName.charAt(0).toUpperCase()}
                </button>
              </>
            ) : (
              <>
                <Link
                  href={`/login?redirect=${encodeURIComponent(pathname)}`}
                  className="hidden lg:block px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-[#1e4d45] transition-colors"
                >
                  Log In
                </Link>

                <Link
                  href={`/signup?redirect=${encodeURIComponent(pathname)}`}
                  className="hidden lg:block bg-gradient-to-r from-[#1e4d45] to-[#2d7566] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:scale-95"
                >
                  Join MyMittr
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                  className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-[#1e4d45] hover:bg-gray-100 transition-colors"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {menuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </header >

      {/* Mobile Menu */}
      {
        menuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu Panel */}
            <div className="absolute top-24 right-4 left-4 bg-white rounded-3xl shadow-2xl p-6 max-h-[calc(100vh-7rem)] overflow-y-auto">

              {/* User Info (if logged in) */}
              {user && (
                <div className="pb-6 mb-6 border-b border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1e4d45] to-[#2d7566] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">Hi, {userName.split(" ")[0]}!</div>
                      <div className="text-sm text-gray-500">{userName}</div>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#e6f0ed] hover:text-[#1e4d45] rounded-xl transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      My Profile
                    </Link>

                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#e6f0ed] hover:text-[#1e4d45] rounded-xl transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </Link>
                  </div>
                </div>
              )}

              {/* Main Navigation */}
              <div className="space-y-2 mb-6">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Menu</div>
                {mainLinks.map((link) => {
                  const isActive =
                    link.path === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.path);

                  return (
                    <Link
                      key={link.name}
                      href={link.path}
                      className={`block px-4 py-3 text-sm font-semibold rounded-xl transition-colors ${isActive
                        ? "text-[#1e4d45] bg-[#e6f0ed]"
                        : "text-gray-600 hover:text-[#1e4d45] hover:bg-gray-50"
                        }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              {/* Services */}
              <div className="space-y-2 mb-6">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Services</div>
                {serviceLinks.map((service) => (
                  <Link
                    key={service.name}
                    href={service.path}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-[#e6f0ed] hover:text-[#1e4d45] rounded-xl transition-colors"
                  >
                    <span className="text-xl">{service.icon}</span>
                    <span>{service.name}</span>
                  </Link>
                ))}
              </div>

              {/* Auth Buttons or Logout */}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 px-6 py-3 rounded-xl text-sm font-bold hover:bg-red-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              ) : (
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <Link
                    href={`/login?redirect=${encodeURIComponent(pathname)}`}
                    className="block w-full text-center px-6 py-3 text-sm font-semibold text-gray-600 hover:text-[#1e4d45] hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    Log In
                  </Link>

                  <Link
                    href={`/signup?redirect=${encodeURIComponent(pathname)}`}
                    className="block w-full text-center bg-gradient-to-r from-[#1e4d45] to-[#2d7566] text-white px-6 py-3 rounded-xl text-sm font-bold hover:shadow-xl transition-all"
                  >
                    Join MyMittr
                  </Link>
                </div>
              )}
            </div>
          </div>
        )
      }
    </>
  );
}