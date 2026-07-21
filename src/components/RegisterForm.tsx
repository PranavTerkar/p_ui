import { useState } from "react";
import type { FormEvent } from "react";

type RegisterFormProps = {
  onSubmit: (name: string, email: string, password: string) => Promise<void>;
  onSwitchToLogin: () => void;
};

function RegisterForm({ onSubmit, onSwitchToLogin }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await onSubmit(name, email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Create an account</h1>

      {error && (
        <div className="mb-4 rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <label className="block mb-4">
        <span className="block text-sm font-medium text-gray-700 mb-1">Name</span>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-800"
        />
      </label>

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
          minLength={8}
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
        {loading ? "Creating account..." : "Register"}
      </button>

      <p className="mt-4 text-sm text-gray-600 text-center">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-gray-900 font-medium underline"
        >
          Log in
        </button>
      </p>
    </form>
  );
}

export default RegisterForm;
