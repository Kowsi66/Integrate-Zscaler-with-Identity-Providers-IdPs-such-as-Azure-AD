import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Shield, Lock, Globe, Mail, Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Features", path: "/features" },
  { name: "Architecture", path: "/architecture" },
  { name: "Help", path: "/help" },
  { name: "Contact", path: "/contact" },
];

const PublicLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-cyber-500/20 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold text-slate-900">
            <Shield className="text-cyber-500" size={20} />
            Zscaler IdP Fusion
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/"}
                className={({ isActive }) =>
                  `text-sm transition font-medium ${isActive ? "text-cyber-500" : "text-slate-600 hover:text-cyber-500"}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/login" className="btn-primary text-xs hidden sm:inline-flex">
              Launch Demo
            </Link>
            {/* Mobile toggle */}
            <button
              className="md:hidden text-slate-600 hover:text-cyber-500"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-cyber-500/20 bg-white/90 backdrop-blur px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2.5 text-sm transition ${isActive ? "bg-cyber-500/20 text-cyber-500" : "text-slate-600 hover:bg-cyber-500/10 hover:text-cyber-500"}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link to="/login" className="btn-primary w-full text-center mt-2 block text-sm" onClick={() => setMobileOpen(false)}>
              Launch Demo
            </Link>
          </div>
        )}
      </header>

      {/* Page */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-10 border-t border-cyber-500/20 bg-white/75">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
          <div>
            <div className="mb-2 flex items-center gap-2 font-display text-slate-900">
              <Shield className="text-cyber-500" size={16} />
              Zscaler IdP Fusion
            </div>
            <p className="text-sm leading-relaxed text-slate-600">
              Final year B.Tech project demonstrating Zero Trust access governance via Zscaler and multi-IdP federation.
            </p>
          </div>
          <div className="space-y-2">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-500">Platform Capabilities</p>
            <p className="flex items-center gap-2 text-sm text-slate-600"><Globe size={13} className="text-cyber-500" /> Multi-IdP Federation (Azure AD, Okta, AD)</p>
            <p className="flex items-center gap-2 text-sm text-slate-600"><Lock size={13} className="text-cyber-500" /> Conditional Access Policy Engine</p>
            <p className="flex items-center gap-2 text-sm text-slate-600"><Shield size={13} className="text-cyber-500" /> Audit Trail & Compliance Reports</p>
          </div>
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-500">Contact</p>
            <p className="mb-2 text-sm text-slate-600">Request a guided walkthrough or send project feedback</p>
            <p className="flex items-center gap-2 text-sm text-slate-600"><Mail size={13} className="text-cyber-500" /> demo@nimbus-enterprise.com</p>
            <div className="mt-4 flex gap-2">
              <Link to="/login" className="btn-primary text-xs">Try Demo</Link>
              <Link to="/contact" className="btn-secondary text-xs">Contact Us</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-cyber-500/20 py-4 text-center text-xs text-slate-500">
          © 2026 Zscaler IdP Fusion · Final Year Project · Built with React + Express
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
