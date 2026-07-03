import { useState } from "react";
import Card from "../../components/Card";
import Table from "../../components/Table";
import { Select } from "../../components/Form";
import { addAudit, getCurrentUser, loadData, nextId, saveData } from "../../utils/storage";
import { submissionTitle, userName } from "../../utils/helpers";

export default function AssignJudgesPage() {
  const user = getCurrentUser();
  const [data, setData] = useState(loadData());
  const judges = data.users.filter((u) => u.role === "JUDGE");
  const [form, setForm] = useState({ judgeId: judges[0]?.id || "", submissionId: data.submissions[0]?.id || "" });

  function submit(e) {
    e.preventDefault();
    const exists = data.judgeAssignments.some((a) => Number(a.judgeId) === Number(form.judgeId) && Number(a.submissionId) === Number(form.submissionId));
    if (exists) return alert("This judge is already assigned to the selected submission.");
    const assignment = { id: nextId(data.judgeAssignments), judgeId: Number(form.judgeId), submissionId: Number(form.submissionId), status: "Assigned" };
    const updated = { ...data, judgeAssignments: [assignment, ...data.judgeAssignments] };
    addAudit(updated, user.id, `Assigned ${userName(data, form.judgeId)} to ${submissionTitle(data, form.submissionId)}`);
    saveData(updated);
    setData(updated);
  }

  return (
    <div className="page">
      <h1>Assign Judges</h1>
      <Card title="Judge Assignment Form">
        <form onSubmit={submit} className="form-grid">
          <Select label="Judge" value={form.judgeId} onChange={(e) => setForm({ ...form, judgeId: e.target.value })}>
            {judges.map((judge) => <option key={judge.id} value={judge.id}>{judge.fullName}</option>)}
          </Select>
          <Select label="Submission" value={form.submissionId} onChange={(e) => setForm({ ...form, submissionId: e.target.value })}>
            {data.submissions.map((s) => <option key={s.id} value={s.id}>{s.projectTitle}</option>)}
          </Select>
          <button className="btn">Assign Judge</button>
        </form>
      </Card>

      <Table columns={[
        { key: "judge", label: "Judge" },
        { key: "submission", label: "Submission" },
        { key: "status", label: "Status" }
      ]} rows={data.judgeAssignments.map((a) => ({
        ...a,
        judge: userName(data, a.judgeId),
        submission: submissionTitle(data, a.submissionId)
      }))} />
    </div>
  );
}
