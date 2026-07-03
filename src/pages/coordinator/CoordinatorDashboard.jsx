import Card from "../../components/Card";
import Table from "../../components/Table";
import Badge from "../../components/Badge";
import { loadData } from "../../utils/storage";
import { userName, submissionTitle } from "../../utils/helpers";

export default function CoordinatorDashboard() {
  const data = loadData();

  return (
    <div className="page">
      <h1>Event Coordinator Dashboard</h1>
      <div className="grid four">
        <Card title="Events" value={data.events.length} />
        <Card title="Teams" value={data.teams.length} />
        <Card title="Submissions" value={data.submissions.length} />
        <Card title="Judge Assignments" value={data.judgeAssignments.length} />
      </div>

      <h2>Judge Assignments</h2>
      <Table
        columns={[
          { key: "judge", label: "Judge" },
          { key: "submission", label: "Submission" },
          { key: "status", label: "Status", render: (r) => <Badge>{r.status}</Badge> }
        ]}
        rows={data.judgeAssignments.map((a) => ({
          ...a,
          judge: userName(data, a.judgeId),
          submission: submissionTitle(data, a.submissionId)
        }))}
      />
    </div>
  );
}
