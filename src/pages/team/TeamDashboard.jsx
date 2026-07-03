import Card from "../../components/Card";
import Table from "../../components/Table";
import Progress from "../../components/Progress";
import Badge from "../../components/Badge";
import { getCurrentUser, loadData } from "../../utils/storage";
import { eventName, findById, calculateSubmissionScore } from "../../utils/helpers";

export default function TeamDashboard() {
  const data = loadData();
  const user = getCurrentUser();
  const myTeams = data.teams.filter((t) => Number(t.leaderId) === Number(user.id) || data.teamMembers.some((m) => Number(m.userId) === Number(user.id) && Number(m.teamId) === Number(t.id)));
  const mySubmissions = data.submissions.filter((s) => myTeams.some((t) => Number(t.id) === Number(s.teamId)));
  const feedback = data.feedback.filter((f) => myTeams.some((t) => Number(t.id) === Number(f.teamId)));

  const progress = mySubmissions.length ? Math.min(100, mySubmissions.length * 35 + feedback.length * 10) : 25;

  return (
    <div className="page">
      <h1>Team Dashboard</h1>
      <div className="grid four">
        <Card title="My Teams" value={myTeams.length} />
        <Card title="Submissions" value={mySubmissions.length} />
        <Card title="Feedback" value={feedback.length} />
        <Card title="Progress"><Progress value={progress} /></Card>
      </div>

      <div className="grid two">
        <Card title="Team Overview">
          {myTeams.map((team) => (
            <div className="mini-item" key={team.id}>
              <b>{team.teamName}</b>
              <span>{eventName(data, team.eventId)}</span>
              <Badge>{team.status}</Badge>
            </div>
          ))}
        </Card>
        <Card title="Latest Feedback">
          {feedback.length ? feedback.map((f) => (
            <p key={f.id}>“{f.content}”</p>
          )) : <p className="muted">No feedback yet.</p>}
        </Card>
      </div>

      <Table
        columns={[
          { key: "projectTitle", label: "Project" },
          { key: "team", label: "Team" },
          { key: "status", label: "Status", render: (r) => <Badge>{r.status}</Badge> },
          { key: "score", label: "Score" }
        ]}
        rows={mySubmissions.map((s) => ({
          ...s,
          team: findById(data.teams, s.teamId)?.teamName,
          score: calculateSubmissionScore(data, s.id)
        }))}
      />
    </div>
  );
}
