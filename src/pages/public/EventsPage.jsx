import Card from "../../components/Card";
import Badge from "../../components/Badge";
import { loadData } from "../../utils/storage";

export default function EventsPage() {
  const data = loadData();

  return (
    <section className="section">
      <div className="page-head">
        <div>
          <h1>Hackathon Events</h1>
          <p>Browse published SEAL Hackathon events and current competition rounds.</p>
        </div>
      </div>

      <div className="grid two">
        {data.events.map((event) => (
          <Card key={event.id} title={event.eventName}>
            <Badge tone="success">{event.status}</Badge>
            <p>{event.description}</p>
            <p><b>Start:</b> {event.startDate}</p>
            <p><b>End:</b> {event.endDate}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
