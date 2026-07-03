import Table from "../../components/Table";
import Badge from "../../components/Badge";
import { loadData } from "../../utils/storage";
import { calculateSubmissionScore, eventName } from "../../utils/helpers";

export default function LeaderboardPage() {
  const data = loadData();
  const rows = data.teams.map((team) => {
    const submission = data.submissions.find((s) => Number(s.teamId) === Number(team.id));
    return {
      id: team.id,
      teamName: team.teamName,
      event: eventName(data, team.eventId),
      project: submission?.projectTitle || team.projectIdea,
      score: submission ? calculateSubmissionScore(data, submission.id) : 0,
      status: team.status
    };
  }).sort((a, b) => b.score - a.score).map((row, index) => ({ ...row, rank: index + 1 }));

  return (
    <section className="section">
      <h1>Published Leaderboard</h1>
      <p>Leaderboard is generated from submitted judge scores in mock data.</p>
      <Table
        columns={[
          { key: "rank", label: "Rank" },
          { key: "teamName", label: "Team" },
          { key: "event", label: "Event" },
          { key: "project", label: "Project" },
          { key: "score", label: "Score" },
          { key: "status", label: "Status", render: (r) => <Badge>{r.status}</Badge> }
        ]}
        rows={rows}
      />
    </section>
  );
}
