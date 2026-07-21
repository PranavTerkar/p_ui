import { useState } from "react";
import type { FormEvent } from "react";

type LoginFormProps = {
  onSubmit: (email: string, password: string) => Promise<void>;
  onSwitchToRegister: () => void;
};

function LoginForm({ onSubmit, onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await onSubmit(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Log in</h1>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <label className="block mb-4">
        <span className="block text-sm font-medium text-gray-700 mb-1">Email</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800"
        />
      </label>

      <label className="block mb-6">
        <span className="block text-sm font-medium text-gray-700 mb-1">Password</span>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-gray-900 py-2 text-white font-medium disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Log in"}
      </button>

      <p className="mt-4 text-sm text-gray-600 text-center">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-gray-900 font-medium underline"
        >
          Register
        </button>
      </p>
    </form>
  );
}

export default LoginForm;
