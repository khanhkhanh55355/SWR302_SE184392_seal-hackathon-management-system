import { useMemo, useState } from "react";
import Badge from "../../components/Badge";
import Card from "../../components/Card";
import Table from "../../components/Table";
import { addAudit, getCurrentUser, loadData, nextId, saveData } from "../../utils/storage";
import { eventName, userName } from "../../utils/helpers";

export default function JoinTeamPage() {
  const user = getCurrentUser();
  const [data, setData] = useState(loadData());
  const [message, setMessage] = useState("");
  const membership = useMemo(() => data.teamMembers.filter((item) => Number(item.userId) === Number(user.id)), [data, user.id]);
  const joinedIds = membership.map((item) => Number(item.teamId));
  const availableTeams = data.teams.filter((team) => !joinedIds.includes(Number(team.id)) && Number(team.leaderId) !== Number(user.id));

  function join(team) {
    const member = { id: nextId(data.teamMembers), teamId: team.id, userId: user.id, memberRole: "Member" };
    const updated = { ...data, teamMembers: [...data.teamMembers, member] };
    addAudit(updated, user.id, `Joined team ${team.teamName}`);
    saveData(updated);
    setData(updated);
    setMessage(`You joined ${team.teamName}. This is saved in browser mock data.`);
  }

  const membershipRows = membership.map((member) => {
    const team = data.teams.find((item) => Number(item.id) === Number(member.teamId));
    return { ...member, team: team?.teamName, event: eventName(data, team?.eventId) };
  });

  return <div className="page">
    <div className="page-heading"><div><h1>Join a Team</h1><p>Find an open project team for the current hackathon and join it as a member.</p></div><Badge tone="success">Mock workflow</Badge></div>
    {message && <div className="notice success-notice">{message}</div>}
    <div className="grid two">
      {availableTeams.map((team) => <Card key={team.id} title={team.teamName} subtitle={eventName(data, team.eventId)} className="team-card">
        <p>{team.projectIdea || "Project idea will be announced by the team leader."}</p>
        <p className="muted">Leader: {userName(data, team.leaderId)}</p>
        <div className="button-row"><Badge>{team.status}</Badge><button className="btn small" onClick={() => join(team)}>Join team</button></div>
      </Card>)}
    </div>
    {!availableTeams.length && <Card title="No teams available"><p className="muted">You have already joined all available mock teams. Reset mock data to replay the flow.</p></Card>}
    <h2>Your memberships</h2>
    <Table columns={[{ key: "team", label: "Team" }, { key: "event", label: "Event" }, { key: "memberRole", label: "Role" }]} rows={membershipRows} />
  </div>;
}
