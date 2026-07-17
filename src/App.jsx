import { Navigate, Route, Routes } from "react-router-dom";
import { getCurrentUser } from "./utils/storage";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import HomePage from "./pages/public/HomePage";
import EventsPage from "./pages/public/EventsPage";
import LeaderboardPage from "./pages/public/LeaderboardPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

import TeamDashboard from "./pages/team/TeamDashboard";
import RegisterTeamPage from "./pages/team/RegisterTeamPage";
import JoinTeamPage from "./pages/team/JoinTeamPage";
import SubmitProjectPage from "./pages/team/SubmitProjectPage";
import TeamResultsPage from "./pages/team/TeamResultsPage";

import MentorDashboard from "./pages/mentor/MentorDashboard";
import TrackProgressPage from "./pages/mentor/TrackProgressPage";
import ProvideFeedbackPage from "./pages/mentor/ProvideFeedbackPage";

import JudgeDashboard from "./pages/judge/JudgeDashboard";
import CalibrationPage from "./pages/judge/CalibrationPage";
import ScoreSubmissionsPage from "./pages/judge/ScoreSubmissionsPage";
import ConflictPage from "./pages/judge/ConflictPage";

import CoordinatorDashboard from "./pages/coordinator/CoordinatorDashboard";
import ConfigureHackathonPage from "./pages/coordinator/ConfigureHackathonPage";
import AssignJudgesPage from "./pages/coordinator/AssignJudgesPage";
import PublishLeaderboardPage from "./pages/coordinator/PublishLeaderboardPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsersPage from "./pages/admin/ManageUsersPage";
import AuditLogsPage from "./pages/admin/AuditLogsPage";
import DataOverviewPage from "./pages/admin/DataOverviewPage";

function RequireAuth({ children }) {
  return getCurrentUser() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/app" element={<RequireAuth><DashboardLayout /></RequireAuth>}>
        <Route index element={<Navigate to="/app/team/dashboard" replace />} />

        <Route path="team/dashboard" element={<TeamDashboard />} />
        <Route path="team/register-team" element={<RegisterTeamPage />} />
        <Route path="team/join-team" element={<JoinTeamPage />} />
        <Route path="team/submit-project" element={<SubmitProjectPage />} />
        <Route path="team/results" element={<TeamResultsPage />} />

        <Route path="mentor/dashboard" element={<MentorDashboard />} />
        <Route path="mentor/progress" element={<TrackProgressPage />} />
        <Route path="mentor/feedback" element={<ProvideFeedbackPage />} />

        <Route path="judge/dashboard" element={<JudgeDashboard />} />
        <Route path="judge/calibration" element={<CalibrationPage />} />
        <Route path="judge/score-submissions" element={<ScoreSubmissionsPage />} />
        <Route path="judge/conflict" element={<ConflictPage />} />

        <Route path="coordinator/dashboard" element={<CoordinatorDashboard />} />
        <Route path="coordinator/configure" element={<ConfigureHackathonPage />} />
        <Route path="coordinator/assign-judges" element={<AssignJudgesPage />} />
        <Route path="coordinator/leaderboard" element={<PublishLeaderboardPage />} />

        <Route path="admin/dashboard" element={<AdminDashboard />} />
        <Route path="admin/users" element={<ManageUsersPage />} />
        <Route path="admin/audit-logs" element={<AuditLogsPage />} />
        <Route path="admin/data-overview" element={<DataOverviewPage />} />
      </Route>
    </Routes>
  );
}
