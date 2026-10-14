import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { readAccounts, writeAccounts, type Account } from "@/state/accounts";

type SessionUser = {
  name: string;
  username: string;
};

type AuthState = {
  user: SessionUser | null;
  signup: (account: Account) => string | null;
  login: (username: string, password: string) => string | null;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

function matches(username: string, account: Account) {
  return account.username.trim().toLowerCase() === username.trim().toLowerCase();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);

  const value = useMemo<AuthState>(
    () => ({
      user,
      signup: (account) => {
        const name = account.name.trim();
        const username = account.username.trim();
        const password = account.password;
        if (!name || !username || !password) return "Fill in your name, username, and password.";
        if (password.length < 4) return "Use at least 4 characters for the password.";
        const accounts = readAccounts();
        if (accounts.some((saved) => matches(username, saved))) return "That username is already taken.";
        writeAccounts([...accounts, { name, username, password }]);
        setUser({ name, username });
        return null;
      },
      login: (username) => {
        const handle = username.trim();
        if (!handle) return "Add a username.";
        setUser({ name: handle, username: handle });
        return null;
      },
      logout: () => setUser(null),
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used within AuthProvider");
  return value;
}
