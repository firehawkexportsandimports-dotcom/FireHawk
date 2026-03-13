import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL;

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =========================
     LOGIN
  ========================= */
  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/admin";
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     REGISTER
  ========================= */
  const handleRegister = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      alert("Registration successful. Wait for admin approval before login.");

      setMode("login");
      setPassword("");
    } catch (err: any) {
      setError(err.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-charcoal via-black to-charcoal">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-ember">
            Firehawk Admin
          </h1>
          <p className="text-sm text-muted-foreground">
            {mode === "login"
              ? "Login to continue"
              : "Create a new account"}
          </p>
        </div>

        {/* TOGGLE */}
        <div className="flex bg-muted rounded-lg p-1">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
              mode === "login"
                ? "bg-white shadow text-foreground"
                : "text-muted-foreground"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
              mode === "register"
                ? "bg-white shadow text-foreground"
                : "text-muted-foreground"
            }`}
          >
            Register
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-2 rounded">
            {error}
          </div>
        )}

        {/* FORM */}
        <div className="space-y-4">
          {mode === "register" && (
            <input
              className="w-full border rounded-lg p-3"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full border rounded-lg p-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={
              mode === "login" ? handleLogin : handleRegister
            }
            disabled={loading}
            className="w-full bg-gradient-to-r from-ember to-saffron text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Create Account"}
          </button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Firehawk Imports & Exports Admin Panel
        </p>
      </div>
    </div>
  );
}
