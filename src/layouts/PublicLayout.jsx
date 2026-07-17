import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function PublicLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav className="public-nav">
        <Link to="/" className="logo">SEAL HMS</Link>
        <button className="mobile-btn" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        <div className={`public-links ${open ? "open" : ""}`}>
          <Link className={location.pathname === "/" ? "nav-active" : ""} to="/">Home</Link>
          <Link className={location.pathname === "/events" ? "nav-active" : ""} to="/events">Events</Link>
          <Link className={location.pathname === "/leaderboard" ? "nav-active" : ""} to="/leaderboard">Leaderboard</Link>
          <Link className={location.pathname === "/register" ? "nav-active" : ""} to="/register">Register</Link>
          <Link className="btn small" to="/login">Login</Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
