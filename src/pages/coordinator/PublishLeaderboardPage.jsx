import { useState } from "react";
import Card from "../../components/Card";
import Table from "../../components/Table";
import Badge from "../../components/Badge";
import { addAudit, getCurrentUser, loadData, saveData } from "../../utils/storage";
import { calculateSubmissionScore } from "../../utils/helpers";

export default function PublishLeaderboardPage() {
  const user = getCurrentUser();
  const [data, setData] = useState(loadData());

  const rows = data.teams.map((team) => {
    const submission = data.submissions.find((s) => Number(s.teamId) === Number(team.id));
    return {
      id: team.id,
      teamName: team.teamName,
      projectTitle: submission?.projectTitle || team.projectIdea,
      score: submission ? calculateSubmissionScore(data, submission.id) : 0,
      status: team.status
    };
  }).sort((a, b) => b.score - a.score).map((row, index) => ({ ...row, rank: index + 1 }));

  function publish() {
    const updated = { ...data, leaderboardPublished: true };
    addAudit(updated, user.id, "Published leaderboard");
    saveData(updated);
    setData(updated);
    alert("Leaderboard published.");
  }

  return (
    <div className="page">
      <h1>Publish Leaderboard</h1>
      <Card title="Publication Status" value={data.leaderboardPublished ? "Published" : "Draft"}>
        <button className="btn" onClick={publish}>Publish Leaderboard</button>
      </Card>

      <Table
        columns={[
          { key: "rank", label: "Rank" },
          { key: "teamName", label: "Team" },
          { key: "projectTitle", label: "Project" },
          { key: "score", label: "Score" },
          { key: "status", label: "Status", render: (r) => <Badge>{r.status}</Badge> }
        ]}
        rows={rows}
      />
    </div>
  );
}
