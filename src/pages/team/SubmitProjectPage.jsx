import { useState } from "react";
import Card from "../../components/Card";
import Table from "../../components/Table";
import { Input, Select } from "../../components/Form";
import { addAudit, getCurrentUser, loadData, nextId, saveData } from "../../utils/storage";
import { findById } from "../../utils/helpers";

export default function SubmitProjectPage() {
  const user = getCurrentUser();
  const [data, setData] = useState(loadData());
  const myTeams = data.teams.filter((t) => Number(t.leaderId) === Number(user.id) || data.teamMembers.some((m) => Number(m.userId) === Number(user.id) && Number(m.teamId) === Number(t.id)));
  const [form, setForm] = useState({ teamId: myTeams[0]?.id || "", roundId: data.rounds[0]?.id || "", projectTitle: "", repositoryUrl: "", demoUrl: "" });

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function submit(e) {
    e.preventDefault();
    if (!form.teamId || !form.projectTitle) return alert("Team and project title are required.");
    const submission = { id: nextId(data.submissions), ...form, teamId: Number(form.teamId), roundId: Number(form.roundId), status: "Submitted" };
    const updatedTeams = data.teams.map((t) => Number(t.id) === Number(form.teamId) ? { ...t, status: "Submitted" } : t);
    const updated = { ...data, submissions: [...data.submissions, submission], teams: updatedTeams };
    addAudit(updated, user.id, `Submitted project ${submission.projectTitle}`);
    saveData(updated);
    setData(updated);
    alert("Project submitted successfully.");
  }

  const mySubmissions = data.submissions.filter((s) => myTeams.some((t) => Number(t.id) === Number(s.teamId)));

  return (
    <div className="page">
      <h1>Submit Project</h1>
      <Card title="Project Submission Form">
        <form onSubmit={submit} className="form-grid">
          <Select label="Team" value={form.teamId} onChange={(e) => update("teamId", e.target.value)}>
            {myTeams.map((team) => <option key={team.id} value={team.id}>{team.teamName}</option>)}
          </Select>
          <Select label="Round" value={form.roundId} onChange={(e) => update("roundId", e.target.value)}>
            {data.rounds.map((round) => <option key={round.id} value={round.id}>{round.roundName}</option>)}
          </Select>
          <Input label="Project Title" value={form.projectTitle} onChange={(e) => update("projectTitle", e.target.value)} />
          <Input label="Repository URL" value={form.repositoryUrl} onChange={(e) => update("repositoryUrl", e.target.value)} />
          <Input label="Demo URL" value={form.demoUrl} onChange={(e) => update("demoUrl", e.target.value)} />
          <Input label="Upload File Mock" type="file" />
          <button className="btn">Submit Project</button>
        </form>
      </Card>

      <h2>My Submissions</h2>
      <Table
        columns={[
          { key: "projectTitle", label: "Project" },
          { key: "team", label: "Team" },
          { key: "repositoryUrl", label: "Repository" },
          { key: "status", label: "Status" }
        ]}
        rows={mySubmissions.map((s) => ({ ...s, team: findById(data.teams, s.teamId)?.teamName }))}
      />
    </div>
  );
}
