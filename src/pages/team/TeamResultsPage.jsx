import Table from "../../components/Table";
import Badge from "../../components/Badge";
import { getCurrentUser, loadData } from "../../utils/storage";
import { calculateSubmissionScore, findById } from "../../utils/helpers";

export default function TeamResultsPage() {
  const data = loadData();
  const user = getCurrentUser();
  const myTeamIds = data.teams.filter((team) => Number(team.leaderId) === Number(user.id) || data.teamMembers.some((member) => Number(member.userId) === Number(user.id) && Number(member.teamId) === Number(team.id))).map((team) => Number(team.id));
  const rows = data.teams.filter((team) => myTeamIds.includes(Number(team.id))).map((team) => {
    const submission = data.submissions.find((s) => Number(s.teamId) === Number(team.id));
    return {
      id: team.id,
      teamName: team.teamName,
      projectTitle: submission?.projectTitle || team.projectIdea,
      score: submission ? calculateSubmissionScore(data, submission.id) : 0,
      status: team.status,
      leader: findById(data.users, team.leaderId)?.fullName
    };
  }).sort((a, b) => b.score - a.score).map((row, index) => ({ ...row, rank: index + 1 }));

  return (
    <div className="page">
      <h1>My Team Results</h1>
      <p className="muted">Final scores are calculated from judges' submitted rubric scores. The public ranking remains available on the Leaderboard page.</p>
      <Table
        columns={[
          { key: "rank", label: "Rank" },
          { key: "teamName", label: "Team" },
          { key: "leader", label: "Leader" },
          { key: "projectTitle", label: "Project" },
          { key: "score", label: "Score" },
          { key: "status", label: "Status", render: (r) => <Badge>{r.status}</Badge> }
        ]}
        rows={rows}
      />
    </div>
  );
}
