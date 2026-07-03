import { useState } from "react";
import Card from "../../components/Card";
import Table from "../../components/Table";
import { Select, Textarea } from "../../components/Form";
import { addAudit, getCurrentUser, loadData, nextId, saveData } from "../../utils/storage";
import { teamName, userName } from "../../utils/helpers";

export default function ProvideFeedbackPage() {
  const user = getCurrentUser();
  const [data, setData] = useState(loadData());
  const assigned = data.mentorAssignments.filter((a) => Number(a.mentorId) === Number(user.id));
  const [form, setForm] = useState({ teamId: assigned[0]?.teamId || "", content: "" });

  function submit(e) {
    e.preventDefault();
    if (!form.teamId || !form.content.trim()) return alert("Team and feedback content are required.");
    const item = { id: nextId(data.feedback), mentorId: user.id, teamId: Number(form.teamId), content: form.content, createdAt: new Date().toLocaleString() };
    const updated = { ...data, feedback: [item, ...data.feedback] };
    addAudit(updated, user.id, `Provided feedback to ${teamName(data, form.teamId)}`);
    saveData(updated);
    setData(updated);
    setForm({ ...form, content: "" });
  }

  return (
    <div className="page">
      <h1>Provide Feedback</h1>
      <Card title="Feedback Form">
        <form onSubmit={submit} className="form-grid">
          <Select label="Assigned Team" value={form.teamId} onChange={(e) => setForm({ ...form, teamId: e.target.value })}>
            {assigned.map((a) => <option key={a.id} value={a.teamId}>{teamName(data, a.teamId)}</option>)}
          </Select>
          <Textarea label="Feedback" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows="5" />
          <button className="btn">Send Feedback</button>
        </form>
      </Card>

      <h2>Feedback History</h2>
      <Table
        columns={[
          { key: "team", label: "Team" },
          { key: "mentor", label: "Mentor" },
          { key: "content", label: "Content" },
          { key: "createdAt", label: "Created At" }
        ]}
        rows={data.feedback.map((f) => ({ ...f, team: teamName(data, f.teamId), mentor: userName(data, f.mentorId) }))}
      />
    </div>
  );
}
