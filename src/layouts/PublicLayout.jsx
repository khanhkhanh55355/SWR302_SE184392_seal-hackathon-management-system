import { Link, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function PublicLayout() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="public-nav">
        <Link to="/" className="logo">SEAL HMS</Link>
        <button className="mobile-btn" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        <div className={`public-links ${open ? "open" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/register">Register</Link>
          <Link className="btn small" to="/login">Login</Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
