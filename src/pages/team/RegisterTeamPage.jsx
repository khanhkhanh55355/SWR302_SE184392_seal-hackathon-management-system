import { useState } from "react";
import Card from "../../components/Card";
import Table from "../../components/Table";
import { Input, Select, Textarea } from "../../components/Form";
import { addAudit, getCurrentUser, loadData, nextId, saveData } from "../../utils/storage";
import { eventName } from "../../utils/helpers";

export default function RegisterTeamPage() {
  const user = getCurrentUser();
  const [data, setData] = useState(loadData());
  const [form, setForm] = useState({ eventId: data.events[0]?.id || "", teamName: "", projectIdea: "", memberRole: "Leader" });

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function submit(e) {
    e.preventDefault();
    if (!form.teamName.trim()) return alert("Team name is required.");
    const newTeam = {
      id: nextId(data.teams),
      eventId: Number(form.eventId),
      leaderId: user.id,
      teamName: form.teamName,
      projectIdea: form.projectIdea,
      status: "Registered"
    };
    const newMember = {
      id: nextId(data.teamMembers),
      teamId: newTeam.id,
      userId: user.id,
      memberRole: form.memberRole
    };
    const updated = { ...data, teams: [...data.teams, newTeam], teamMembers: [...data.teamMembers, newMember] };
    addAudit(updated, user.id, `Registered team ${newTeam.teamName}`);
    saveData(updated);
    setData(updated);
    setForm({ ...form, teamName: "", projectIdea: "" });
    alert("Team registered successfully.");
  }

  const myTeams = data.teams.filter((t) => Number(t.leaderId) === Number(user.id));

  return (
    <div className="page">
      <h1>Register Team</h1>
      <Card title="Team Registration Form">
        <form onSubmit={submit} className="form-grid">
          <Select label="Hackathon Event" value={form.eventId} onChange={(e) => update("eventId", e.target.value)}>
            {data.events.map((event) => <option key={event.id} value={event.id}>{event.eventName}</option>)}
          </Select>
          <Input label="Team Name" value={form.teamName} onChange={(e) => update("teamName", e.target.value)} placeholder="Code Seals" />
          <Select label="Member Role" value={form.memberRole} onChange={(e) => update("memberRole", e.target.value)}>
            <option>Leader</option>
            <option>Developer</option>
            <option>Designer</option>
            <option>Presenter</option>
          </Select>
          <Textarea label="Project Idea" value={form.projectIdea} onChange={(e) => update("projectIdea", e.target.value)} placeholder="Describe project idea" />
          <button className="btn">Register Team</button>
        </form>
      </Card>

      <h2>My Registered Teams</h2>
      <Table
        columns={[
          { key: "teamName", label: "Team" },
          { key: "event", label: "Event" },
          { key: "projectIdea", label: "Project Idea" },
          { key: "status", label: "Status" }
        ]}
        rows={myTeams.map((t) => ({ ...t, event: eventName(data, t.eventId) }))}
      />
    </div>
  );
}
