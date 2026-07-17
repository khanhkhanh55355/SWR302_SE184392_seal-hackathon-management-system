import { Link } from "react-router-dom";
import Card from "../../components/Card";
import Badge from "../../components/Badge";
import { loadData } from "../../utils/storage";
import { ArrowRight, CalendarDays, MessageSquareText, Scale, ShieldCheck, UsersRound } from "lucide-react";

export default function HomePage() {
  const data = loadData();
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Software Engineering Agile League · 2026</p>
          <h1>Build, mentor, evaluate — all in one hackathon workspace.</h1>
          <p>
            A complete role-based demo for participants, mentors, judges, event coordinators and system administrators.
          </p>
          <div className="hero-actions">
            <Link className="btn" to="/login">Try Prototype <ArrowRight size={17} /></Link>
            <Link className="btn outline" to="/events">View Events</Link>
          </div>
          <div className="hero-proof"><ShieldCheck size={18} /> Role-based demo · Mock data only · No backend required</div>
        </div>
        <div className="hero-panel" aria-label="Hackathon overview">
          <div className="hero-panel-head"><span>SEAL Summer Challenge</span><Badge tone="success">Scoring live</Badge></div>
          <div className="hero-metric"><b>24</b><span>active teams</span><b>12</b><span>mentors & judges</span></div>
          <div className="hero-timeline">
            <div className="timeline-row done"><i /> Team registration <span>Completed</span></div>
            <div className="timeline-row done"><i /> Project submission <span>Completed</span></div>
            <div className="timeline-row current"><i /> Judge evaluation <span>In progress</span></div>
            <div className="timeline-row"><i /> Leaderboard release <span>Next</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="page-heading"><div><h2>One system, five role-based journeys</h2><p className="muted">Every use case in the project diagrams is available to try with mock data.</p></div><Badge tone="success">Frontend demo</Badge></div>
        <div className="grid four">
          <Card title="Participants" value="Form a team" subtitle="Register, join a team, and submit your project."><UsersRound className="card-icon" /></Card>
          <Card title="Mentors" value="Guide progress" subtitle="Follow assigned teams and send actionable feedback."><MessageSquareText className="card-icon" /></Card>
          <Card title="Judges" value="Evaluate fairly" subtitle="Calibrate, declare conflicts, and submit rubric scores."><Scale className="card-icon" /></Card>
          <Card title="Organizers" value="Run the event" subtitle="Configure rounds, assign judges, publish rankings."><CalendarDays className="card-icon" /></Card>
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
