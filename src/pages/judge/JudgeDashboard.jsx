import Card from "../../components/Card";
import Table from "../../components/Table";
import Badge from "../../components/Badge";
import { getCurrentUser, loadData } from "../../utils/storage";
import { submissionTitle } from "../../utils/helpers";

export default function JudgeDashboard() {
  const data = loadData();
  const user = getCurrentUser();
  const assignments = data.judgeAssignments.filter((a) => Number(a.judgeId) === Number(user.id));
  const conflicts = data.conflicts.filter((c) => Number(c.judgeId) === Number(user.id));
  const calibration = data.calibration.find((c) => Number(c.judgeId) === Number(user.id));

  return (
    <div className="page">
      <h1>Judge Dashboard</h1>
      <div className="grid four">
        <Card title="Assigned Submissions" value={assignments.length} />
        <Card title="Scored" value={assignments.filter((a) => a.status === "Scored").length} />
        <Card title="Conflicts" value={conflicts.length} />
        <Card title="Calibration" value={calibration?.status || "Pending"} />
      </div>

      <Table
        columns={[
          { key: "submission", label: "Submission" },
          { key: "status", label: "Status", render: (r) => <Badge>{r.status}</Badge> }
        ]}
        rows={assignments.map((a) => ({ ...a, submission: submissionTitle(data, a.submissionId) }))}
      />
    </div>
  );
}
