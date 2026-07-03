import Card from "../../components/Card";
import Table from "../../components/Table";
import Progress from "../../components/Progress";
import { getCurrentUser, loadData } from "../../utils/storage";
import { teamName } from "../../utils/helpers";

export default function MentorDashboard() {
  const data = loadData();
  const user = getCurrentUser();
  const assignments = data.mentorAssignments.filter((a) => Number(a.mentorId) === Number(user.id));
  const assignedTeamIds = assignments.map((a) => a.teamId);
  const feedback = data.feedback.filter((f) => Number(f.mentorId) === Number(user.id));

  return (
    <div className="page">
      <h1>Mentor Dashboard</h1>
      <div className="grid three">
        <Card title="Assigned Teams" value={assignments.length} />
        <Card title="Feedback Sent" value={feedback.length} />
        <Card title="Average Progress"><Progress value={72} /></Card>
      </div>

      <Table
        columns={[
          { key: "team", label: "Team" },
          { key: "projectIdea", label: "Project Idea" },
          { key: "status", label: "Status" }
        ]}
        rows={data.teams.filter((t) => assignedTeamIds.includes(t.id)).map((t) => ({ ...t, team: teamName(data, t.id) }))}
      />
    </div>
  );
}
