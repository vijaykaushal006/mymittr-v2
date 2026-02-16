import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: "Home", href: "/" },
      { name: "Vision", href: "/vision" },
      { name: "About", href: "/about" },
      { name: "All Services", href: "/services" },
    ],
    services: [
      { name: "Jobs for Seniors", href: "/services/jobs" },
      { name: "Health & Wellness", href: "/services/health" },
      { name: "Companionship", href: "/services/companionship" },
      { name: "Medical Services", href: "/services/medical" },
      { name: "Emergency Help", href: "/services/emergency" },
      { name: "Mittr Community", href: "/services/community" },
    ],
    support: [
      { name: "Help Center", href: "/support" },
      { name: "Contact Us", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Use", href: "/terms" },
    ],
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 border-t border-gray-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(30,77,69,0.03),transparent_50%)]" />
      
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-8 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Brand Identity */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1e4d45] to-[#2d6b5f] text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-900/20 ring-1 ring-white/20">
                M
              </div>
              <h3 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-[#1e4d45] to-[#2d6b5f] bg-clip-text text-transparent">
                MyMittr
              </h3>
            </div>
            
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm font-light">
              A respectful space built for the wisdom, independence, 
              and dignity of India's seniors. Empowering golden years with care.
            </p>
            
            <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
              <svg className="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Trusted by thousands of seniors</span>
            </div>
          </div>

          {/* Platform Links */}
          <div className="lg:col-span-2">
            <h4 className="font-semibold text-gray-900 mb-4 text-xs uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-600 hover:text-[#1e4d45] transition-all duration-200 flex items-center group text-sm font-light hover:font-normal"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#1e4d45] group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-3">
            <h4 className="font-semibold text-gray-900 mb-4 text-xs uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-600 hover:text-[#1e4d45] transition-all duration-200 flex items-center group text-sm font-light hover:font-normal"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#1e4d45] group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="lg:col-span-3">
            <h4 className="font-semibold text-gray-900 mb-4 text-xs uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-2.5 mb-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-600 hover:text-[#1e4d45] transition-all duration-200 flex items-center group text-sm font-light hover:font-normal"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#1e4d45] group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="group relative p-4 rounded-xl bg-white border border-emerald-100/50 shadow-sm transition-all duration-300">
              <div className="relative">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
                    Email Us
                  </p>
                </div>
                <a 
                  href="mailto:connect@mymittr.com" 
                  className="text-sm font-semibold text-[#1e4d45] hover:text-[#2d6b5f] transition-colors duration-200"
                >
                  connect@mymittr.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-5 border-t border-gray-200/70">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              © {currentYear} MyMittr. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-[#1e4d45] transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-[#1e4d45] transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="hover:text-[#1e4d45] transition-colors">
                Cookies
              </Link>
              <span className="ml-2 opacity-80">🇮🇳 Built in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}