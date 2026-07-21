import { useEffect, useState } from "react";
import { getUsers } from "../lib/api";
import type { AuthUser } from "../lib/api";

type DashboardProps = {
  token: string;
  user: AuthUser;
  onLogout: () => void;
};

function Dashboard({ token, user, onLogout }: DashboardProps) {
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUsers(token)
      .then(setUsers)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load users"));
  }, [token]);

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome, {user.name}</h1>
        <button
          onClick={onLogout}
          className="text-sm font-medium text-gray-600 underline"
        >
          Log out
        </button>
      </div>

      <p className="text-sm text-gray-500 mb-4">Signed in as {user.email}</p>

      <h2 className="text-sm font-semibold text-gray-700 mb-2">Registered users</h2>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <ul className="divide-y divide-gray-100 rounded-md border border-gray-100">
        {users.map((u) => (
          <li key={u.id} className="px-3 py-2 text-sm text-gray-800">
            {u.name} <span className="text-gray-400">({u.email})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
