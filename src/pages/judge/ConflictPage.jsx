import { useState } from "react";
import Card from "../../components/Card";
import Table from "../../components/Table";
import { Select, Textarea } from "../../components/Form";
import { addAudit, getCurrentUser, loadData, nextId, saveData } from "../../utils/storage";
import { submissionTitle, userName } from "../../utils/helpers";

export default function ConflictPage() {
  const user = getCurrentUser();
  const [data, setData] = useState(loadData());
  const assignments = data.judgeAssignments.filter((a) => Number(a.judgeId) === Number(user.id));
  const [form, setForm] = useState({ submissionId: assignments[0]?.submissionId || "", reason: "" });

  function submit(e) {
    e.preventDefault();
    if (!form.reason.trim()) return alert("Reason is required.");
    const conflict = { id: nextId(data.conflicts), judgeId: user.id, submissionId: Number(form.submissionId), reason: form.reason, status: "Pending Review" };
    const updated = { ...data, conflicts: [conflict, ...data.conflicts] };
    addAudit(updated, user.id, `Flagged conflict for ${submissionTitle(data, form.submissionId)}`);
    saveData(updated);
    setData(updated);
    setForm({ ...form, reason: "" });
  }

  return (
    <div className="page">
      <h1>Flag Conflict of Interest</h1>
      <Card title="Conflict Declaration">
        <form onSubmit={submit} className="form-grid">
          <Select label="Submission" value={form.submissionId} onChange={(e) => setForm({ ...form, submissionId: e.target.value })}>
            {assignments.map((a) => <option key={a.id} value={a.submissionId}>{submissionTitle(data, a.submissionId)}</option>)}
          </Select>
          <Textarea label="Reason" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} />
          <button className="btn danger">Submit Conflict Flag</button>
        </form>
      </Card>

      <Table
        columns={[
          { key: "judge", label: "Judge" },
          { key: "submission", label: "Submission" },
          { key: "reason", label: "Reason" },
          { key: "status", label: "Status" }
        ]}
        rows={data.conflicts.map((c) => ({ ...c, judge: userName(data, c.judgeId), submission: submissionTitle(data, c.submissionId) }))}
      />
    </div>
  );
}
