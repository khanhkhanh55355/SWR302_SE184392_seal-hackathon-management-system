import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addAudit, loadData, nextId, saveData, setCurrentUser } from "../../utils/storage";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "123456" });
  const [error, setError] = useState("");

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function submit(e) {
    e.preventDefault();
    const data = loadData();
    if (!form.fullName || !form.email || !form.password) {
      setError("Please fill all required fields.");
      return;
    }
    if (data.users.some((u) => u.email === form.email)) {
      setError("Email already exists.");
      return;
    }
    const user = { id: nextId(data.users), ...form, role: "TEAM", status: "Active" };
    data.users.push(user);
    addAudit(data, user.id, "Registered new account");
    saveData(data);
    setCurrentUser(user);
    navigate("/app/team/dashboard");
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <Link to="/" className="logo">SEAL HMS</Link>
        <h1>Register</h1>
        {error && <div className="error">{error}</div>}
        <label>Full Name</label>
        <input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
        <label>Email</label>
        <input value={form.email} onChange={(e) => update("email", e.target.value)} />
        <label>Password</label>
        <input value={form.password} onChange={(e) => update("password", e.target.value)} />
        <button className="btn full">Create Account</button>
        <p className="muted">Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
}
