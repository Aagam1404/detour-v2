import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { ScreenShell } from "@/components/layout/ScreenShell";
import { useAuth } from "@/state/AuthState";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const message = login(username, password);
    if (message) {
      setError(message);
      return;
    }
    navigate("/onboarding/1");
  };

  return (
    <ScreenShell>
      <form className="auth" onSubmit={submit}>
        <h1>Log in</h1>
        <p>Pick up where you left off.</p>
        <label className="auth__field">
          <UserIcon />
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
            autoComplete="username"
            aria-label="Username"
          />
        </label>
        <label className="auth__field">
          <LockIcon />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            type="password"
            autoComplete="current-password"
            aria-label="Password"
          />
        </label>
        {error ? <p className="auth__error">{error}</p> : null}
        <Button type="submit">Log in</Button>
        <p className="auth__switch">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </form>
    </ScreenShell>
  );
}

export function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="7" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 16.5c1.2-2.4 3.1-3.5 5.5-3.5s4.3 1.1 5.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <rect x="4.5" y="9" width="11" height="7.5" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7 9V7.2a3 3 0 0 1 6 0V9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
