import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loadData, setCurrentUser } from "../../utils/storage";

const homeByRole = {
  TEAM: "/app/team/dashboard",
  MENTOR: "/app/mentor/dashboard",
  JUDGE: "/app/judge/dashboard",
  COORDINATOR: "/app/coordinator/dashboard",
  ADMIN: "/app/admin/dashboard"
};

export default function LoginPage() {
  const data = loadData();
  const navigate = useNavigate();
  const [email, setEmail] = useState("team@seal.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const user = data.users.find((u) => u.email === email && u.password === password && u.status === "Active");
    if (!user) {
      setError("Invalid account or inactive user.");
      return;
    }
    setCurrentUser(user);
    navigate(homeByRole[user.role] || "/");
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <Link to="/" className="logo">SEAL HMS</Link>
        <h1>Login</h1>
        <p>All demo accounts use password <b>123456</b>.</p>
        {error && <div className="error">{error}</div>}
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn full">Login</button>

        <div className="sample-list">
          {data.users.slice(0, 5).map((u) => (
            <button type="button" key={u.email} onClick={() => setEmail(u.email)}>
              {u.role}
            </button>
          ))}
        </div>
        <p className="muted">No account? <Link to="/register">Register as Team Member</Link></p>
      </form>
    </div>
  );
}
