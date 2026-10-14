import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { ScreenShell } from "@/components/layout/ScreenShell";
import { useAuth } from "@/state/AuthState";
import { LockIcon, UserIcon } from "@/screens/auth/Login";

function AtIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M13 10.2v1.2a1.8 1.8 0 0 0 3.2 1.1" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10" cy="10" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const message = signup({ name, username, password });
    if (message) {
      setError(message);
      return;
    }
    navigate("/onboarding/1");
  };

  return (
    <ScreenShell>
      <form className="auth" onSubmit={submit}>
        <button type="button" className="auth__back" onClick={() => navigate("/login")} aria-label="Back to log in">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M11 4 L6 9 L11 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1>Sign up</h1>
        <p>Make a name for yourself in the city.</p>
        <label className="auth__field">
          <UserIcon />
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Full name"
            autoComplete="name"
            aria-label="Full name"
          />
        </label>
        <label className="auth__field">
          <AtIcon />
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
            autoComplete="new-password"
            aria-label="Password"
          />
        </label>
        {error ? <p className="auth__error">{error}</p> : null}
        <Button type="submit">Sign up</Button>
        <p className="auth__switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </ScreenShell>
  );
}
