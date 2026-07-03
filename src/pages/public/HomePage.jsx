import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { loadData } from "../../utils/storage";

export default function HomePage() {
  const data = loadData();
  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">Software Engineering Agile League</p>
          <h1>SEAL Hackathon Management System</h1>
          <p>
            A role-based frontend prototype for managing hackathon events, teams,
            submissions, mentoring, judging, leaderboards, users, and audit logs.
          </p>
          <div className="hero-actions">
            <Link className="btn" to="/login">Try Prototype</Link>
            <Link className="btn outline" to="/events">View Events</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>System modules</h2>
        <div className="grid four">
          <Card title="Team" value="Register & Submit" />
          <Card title="Mentor" value="Track & Feedback" />
          <Card title="Judge" value="Score & Conflict" />
          <Card title="Admin" value="Users & Logs" />
        </div>

        <h2>Current events</h2>
        <div className="grid two">
          {data.events.map((event) => (
            <Card key={event.id} title={event.eventName} subtitle={event.description}>
              <p><b>Status:</b> {event.status}</p>
              <p><b>Date:</b> {event.startDate} - {event.endDate}</p>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
