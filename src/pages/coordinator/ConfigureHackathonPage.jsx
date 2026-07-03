import { useState } from "react";
import Card from "../../components/Card";
import Table from "../../components/Table";
import { Input, Select, Textarea } from "../../components/Form";
import { addAudit, getCurrentUser, loadData, nextId, saveData } from "../../utils/storage";
import { eventName } from "../../utils/helpers";

export default function ConfigureHackathonPage() {
  const user = getCurrentUser();
  const [data, setData] = useState(loadData());
  const [eventForm, setEventForm] = useState({
    eventName: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Registration Open"
  });
  const [roundForm, setRoundForm] = useState({
    eventId: data.events[0]?.id || "",
    roundName: "",
    startTime: "",
    endTime: "",
    status: "Upcoming"
  });

  function updateEvent(key, value) {
    setEventForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateRound(key, value) {
    setRoundForm((prev) => ({ ...prev, [key]: value }));
  }

  function createEvent(e) {
    e.preventDefault();
    if (!eventForm.eventName) return alert("Event name is required.");
    const event = { id: nextId(data.events), ...eventForm };
    const updated = { ...data, events: [event, ...data.events] };
    addAudit(updated, user.id, `Created event ${event.eventName}`);
    saveData(updated);
    setData(updated);
    setEventForm({ eventName: "", description: "", startDate: "", endDate: "", status: "Registration Open" });
  }

  function createRound(e) {
    e.preventDefault();
    if (!roundForm.roundName) return alert("Round name is required.");
    const round = { id: nextId(data.rounds), ...roundForm, eventId: Number(roundForm.eventId) };
    const updated = { ...data, rounds: [round, ...data.rounds] };
    addAudit(updated, user.id, `Created round ${round.roundName}`);
    saveData(updated);
    setData(updated);
    setRoundForm({ ...roundForm, roundName: "", startTime: "", endTime: "" });
  }

  return (
    <div className="page">
      <h1>Configure Hackathon / Rounds</h1>

      <div className="grid two">
        <Card title="Create Hackathon Event">
          <form onSubmit={createEvent} className="form-grid">
            <Input label="Event Name" value={eventForm.eventName} onChange={(e) => updateEvent("eventName", e.target.value)} />
            <Textarea label="Description" value={eventForm.description} onChange={(e) => updateEvent("description", e.target.value)} />
            <Input label="Start Date" type="date" value={eventForm.startDate} onChange={(e) => updateEvent("startDate", e.target.value)} />
            <Input label="End Date" type="date" value={eventForm.endDate} onChange={(e) => updateEvent("endDate", e.target.value)} />
            <Select label="Status" value={eventForm.status} onChange={(e) => updateEvent("status", e.target.value)}>
              <option>Registration Open</option>
              <option>Scoring</option>
              <option>Completed</option>
              <option>Closed</option>
            </Select>
            <button className="btn">Save Event</button>
          </form>
        </Card>

        <Card title="Create Round">
          <form onSubmit={createRound} className="form-grid">
            <Select label="Event" value={roundForm.eventId} onChange={(e) => updateRound("eventId", e.target.value)}>
              {data.events.map((event) => <option key={event.id} value={event.id}>{event.eventName}</option>)}
            </Select>
            <Input label="Round Name" value={roundForm.roundName} onChange={(e) => updateRound("roundName", e.target.value)} />
            <Input label="Start Time" value={roundForm.startTime} onChange={(e) => updateRound("startTime", e.target.value)} placeholder="2026-06-20 08:00" />
            <Input label="End Time" value={roundForm.endTime} onChange={(e) => updateRound("endTime", e.target.value)} placeholder="2026-06-22 23:59" />
            <Select label="Status" value={roundForm.status} onChange={(e) => updateRound("status", e.target.value)}>
              <option>Upcoming</option>
              <option>Open</option>
              <option>Closed</option>
            </Select>
            <button className="btn">Save Round</button>
          </form>
        </Card>
      </div>

      <h2>Events</h2>
      <Table columns={[
        { key: "eventName", label: "Event" },
        { key: "startDate", label: "Start" },
        { key: "endDate", label: "End" },
        { key: "status", label: "Status" }
      ]} rows={data.events} />

      <h2>Rounds</h2>
      <Table columns={[
        { key: "roundName", label: "Round" },
        { key: "event", label: "Event" },
        { key: "startTime", label: "Start" },
        { key: "endTime", label: "End" },
        { key: "status", label: "Status" }
      ]} rows={data.rounds.map((r) => ({ ...r, event: eventName(data, r.eventId) }))} />
    </div>
  );
}
