import { useState } from "react";
import Card from "../../components/Card";
import Table from "../../components/Table";
import { Input, Select, Textarea } from "../../components/Form";
import { addAudit, getCurrentUser, loadData, nextId, saveData } from "../../utils/storage";
import { submissionTitle } from "../../utils/helpers";

const criteria = ["Technical Quality", "Innovation", "Business Value", "Presentation", "Teamwork"];

export default function ScoreSubmissionsPage() {
  const user = getCurrentUser();
  const [data, setData] = useState(loadData());
  const assignments = data.judgeAssignments.filter((a) => Number(a.judgeId) === Number(user.id));
  const [form, setForm] = useState({ judgeAssignmentId: assignments[0]?.id || "", criterion: criteria[0], scoreValue: 20, comment: "" });

  function submit(e) {
    e.preventDefault();
    if (!form.judgeAssignmentId) return alert("No assignment selected.");
    const score = { id: nextId(data.scores), judgeAssignmentId: Number(form.judgeAssignmentId), criterion: form.criterion, scoreValue: Number(form.scoreValue), comment: form.comment };
    const updatedAssignments = data.judgeAssignments.map((a) => Number(a.id) === Number(form.judgeAssignmentId) ? { ...a, status: "Scored" } : a);
    const updated = { ...data, scores: [...data.scores, score], judgeAssignments: updatedAssignments };
    addAudit(updated, user.id, `Scored ${form.criterion}`);
    saveData(updated);
    setData(updated);
    alert("Score submitted.");
  }

  return (
    <div className="page">
      <h1>Score Submissions</h1>
      <Card title="Scoring Form">
        <form onSubmit={submit} className="form-grid">
          <Select label="Assigned Submission" value={form.judgeAssignmentId} onChange={(e) => setForm({ ...form, judgeAssignmentId: e.target.value })}>
            {assignments.map((a) => <option key={a.id} value={a.id}>{submissionTitle(data, a.submissionId)}</option>)}
          </Select>
          <Select label="Criterion" value={form.criterion} onChange={(e) => setForm({ ...form, criterion: e.target.value })}>
            {criteria.map((c) => <option key={c}>{c}</option>)}
          </Select>
          <Input label="Score Value" type="number" min="0" max="25" value={form.scoreValue} onChange={(e) => setForm({ ...form, scoreValue: e.target.value })} />
          <Textarea label="Comment" value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} />
          <button className="btn">Submit Score</button>
        </form>
      </Card>

      <Table
        columns={[
          { key: "criterion", label: "Criterion" },
          { key: "scoreValue", label: "Score" },
          { key: "comment", label: "Comment" }
        ]}
        rows={data.scores.filter((score) => assignments.some((assignment) => Number(assignment.id) === Number(score.judgeAssignmentId)))}
      />
    </div>
  );
}
