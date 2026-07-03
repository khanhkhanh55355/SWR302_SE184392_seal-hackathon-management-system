import Card from "../../components/Card";
import Progress from "../../components/Progress";
import { getCurrentUser, loadData } from "../../utils/storage";

export default function TrackProgressPage() {
  const data = loadData();
  const user = getCurrentUser();
  const assignments = data.mentorAssignments.filter((a) => Number(a.mentorId) === Number(user.id));
  const teams = data.teams.filter((team) => assignments.some((a) => Number(a.teamId) === Number(team.id)));

  function progressForTeam(team) {
    const submissions = data.submissions.filter((s) => Number(s.teamId) === Number(team.id));
    const feedback = data.feedback.filter((f) => Number(f.teamId) === Number(team.id));
    return Math.min(100, 25 + submissions.length * 35 + feedback.length * 15);
  }

  return (
    <div className="page">
      <h1>Track Team Progress</h1>
      <div className="grid two">
        {teams.map((team) => (
          <Card key={team.id} title={team.teamName} subtitle={team.projectIdea}>
            <p><b>Status:</b> {team.status}</p>
            <Progress value={progressForTeam(team)} />
          </Card>
        ))}
      </div>
    </div>
  );
}
