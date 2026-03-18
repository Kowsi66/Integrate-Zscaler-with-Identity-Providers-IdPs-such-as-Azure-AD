import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import { Shield, Eye, EyeOff, ChevronRight } from "lucide-react";

const SSO_PROVIDERS = [
  { label: "Azure AD", value: "AZURE_AD", color: "text-blue-400", hint: "superadmin@nimbus.com" },
  { label: "Okta", value: "OKTA", color: "text-cyan-400", hint: "security.admin@nimbus.com" },
  { label: "Active Directory", value: "ACTIVE_DIRECTORY", color: "text-orange-400", hint: "it.admin@nimbus.com" },
];

const LoginPage = () => {
  const { login, loginWithProvider } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("employee@nimbus.com");
  const [password, setPassword] = useState("Password@123");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ssoLoading, setSsoLoading] = useState(null);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/app/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSso = async (provider) => {
    setError("");
    setSsoLoading(provider.value);
    try {
      await loginWithProvider(email, provider.value);
      navigate("/app/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || `SSO failed for ${provider.label}. Ensure the email matches the provider.`);
    } finally {
      setSsoLoading(null);
    }
  };

  return (
    <section className="relative mx-auto flex min-h-[85vh] max-w-md items-center px-6 py-12">
      <div className="pointer-events-none absolute -left-8 top-10 h-28 w-28 rounded-full bg-cyber-500/20 blur-2xl" />
      <div className="pointer-events-none absolute -right-10 bottom-16 h-36 w-36 rounded-full bg-green-500/20 blur-3xl" />

      <div className="glass login-card lift-in w-full p-8">
        {/* Logo */}
        <div className="mb-6 flex items-center gap-2">
          <Shield className="text-cyber-500" size={22} />
          <span className="font-display text-lg text-slate-900">Zscaler IdP Fusion</span>
        </div>

        <h2 className="font-display text-3xl text-slate-900">Sign in</h2>
        <p className="mt-1.5 text-sm text-slate-600">Use local credentials or enterprise SSO simulation.</p>

        {error && (
          <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-600">Email</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-600">Password</label>
            <div className="relative">
              <input
                className="input pr-10"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyber-500"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
          <button
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? (
              <><span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Signing in...</>
            ) : (
              <><ChevronRight size={14} /> Sign in with Local Account</>
            )}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-700" /></div>
          <div className="relative flex justify-center"><span className="bg-white/90 px-3 text-xs text-slate-500">or use enterprise SSO</span></div>
        </div>

        <div className="space-y-2">
          {SSO_PROVIDERS.map((provider) => (
            <button
              key={provider.value}
              className="btn-secondary w-full flex items-center justify-between group disabled:opacity-60"
              onClick={() => handleSso(provider)}
              disabled={!!ssoLoading}
              type="button"
            >
              <span className="flex items-center gap-2">
                {ssoLoading === provider.value
                  ? <span className="h-3.5 w-3.5 rounded-full border-2 border-slate-400 border-t-white animate-spin" />
                  : <span className={`h-2 w-2 rounded-full ${provider.color.replace("text-", "bg-")}`} />
                }
                {provider.label}
              </span>
              <span className="text-xs text-slate-500 group-hover:text-slate-700">{provider.hint}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-between text-xs text-slate-600">
          <Link to="/register" className="hover:text-cyber-500">Create account</Link>
          <Link to="/forgot-password" className="hover:text-cyber-500">Forgot password?</Link>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
