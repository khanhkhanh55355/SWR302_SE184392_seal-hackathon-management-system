import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard, Users, UploadCloud, Trophy, MessageSquare, ClipboardCheck,
  ShieldAlert, Settings, UserCog, FileClock, LogOut, Menu, X, BarChart3,
  Database, RefreshCcw
} from "lucide-react";
import { getCurrentUser, logout, resetData } from "../utils/storage";

const menus = {
  TEAM: [
    ["Dashboard", "/app/team/dashboard", LayoutDashboard],
    ["Register Team", "/app/team/register-team", Users],
    ["Submit Project", "/app/team/submit-project", UploadCloud],
    ["View Results", "/app/team/results", Trophy]
  ],
  MENTOR: [
    ["Dashboard", "/app/mentor/dashboard", LayoutDashboard],
    ["Track Progress", "/app/mentor/progress", BarChart3],
    ["Provide Feedback", "/app/mentor/feedback", MessageSquare]
  ],
  JUDGE: [
    ["Dashboard", "/app/judge/dashboard", LayoutDashboard],
    ["Calibration Round", "/app/judge/calibration", ClipboardCheck],
    ["Score Submissions", "/app/judge/score-submissions", Trophy],
    ["Conflict of Interest", "/app/judge/conflict", ShieldAlert]
  ],
  COORDINATOR: [
    ["Dashboard", "/app/coordinator/dashboard", LayoutDashboard],
    ["Configure Hackathon", "/app/coordinator/configure", Settings],
    ["Assign Judges", "/app/coordinator/assign-judges", UserCog],
    ["Publish Leaderboard", "/app/coordinator/leaderboard", Trophy]
  ],
  ADMIN: [
    ["Dashboard", "/app/admin/dashboard", LayoutDashboard],
    ["Manage Users", "/app/admin/users", Users],
    ["Audit Logs", "/app/admin/audit-logs", FileClock],
    ["Data Overview", "/app/admin/data-overview", Database]
  ]
};

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const user = getCurrentUser();
  const navigate = useNavigate();
  const menu = menus[user?.role] || [];

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function handleReset() {
    if (confirm("Reset all mock data?")) {
      resetData();
      window.location.reload();
    }
  }

  return (
    <div className="app-shell">
      <button className="sidebar-toggle" onClick={() => setOpen(true)}><Menu /></button>
      {open && <div className="overlay" onClick={() => setOpen(false)} />}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-head">
          <Link className="logo white" to="/">SEAL</Link>
          <button className="mobile-close" onClick={() => setOpen(false)}><X /></button>
        </div>
        <div className="user-box">
          <b>{user?.fullName}</b>
          <span>{user?.role}</span>
        </div>
        <div className="menu">
          {menu.map(([label, path, Icon]) => (
            <Link className="menu-item" key={path} to={path} onClick={() => setOpen(false)}>
              <Icon size={18} /> {label}
            </Link>
          ))}
        </div>
        <button className="menu-item ghost" onClick={handleReset}><RefreshCcw size={18} /> Reset Mock Data</button>
        <button className="menu-item ghost" onClick={handleLogout}><LogOut size={18} /> Logout</button>
      </aside>
      <main className="main">
        <header className="topbar">
          <div>
            <h2>Welcome, {user?.fullName}</h2>
            <p>SEAL Hackathon Management System</p>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
