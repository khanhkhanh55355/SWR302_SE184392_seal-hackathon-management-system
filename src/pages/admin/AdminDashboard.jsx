import Card from "../../components/Card";
import Table from "../../components/Table";
import { loadData } from "../../utils/storage";
import { userName } from "../../utils/helpers";

export default function AdminDashboard() {
  const data = loadData();

  return (
    <div className="page">
      <h1>System Admin Dashboard</h1>
      <div className="grid four">
        <Card title="Users" value={data.users.length} />
        <Card title="Events" value={data.events.length} />
        <Card title="Teams" value={data.teams.length} />
        <Card title="Audit Logs" value={data.auditLogs.length} />
      </div>

      <h2>Recent Audit Logs</h2>
      <Table
        columns={[
          { key: "user", label: "User" },
          { key: "action", label: "Action" },
          { key: "createdAt", label: "Created At" }
        ]}
        rows={data.auditLogs.slice(0, 6).map((log) => ({ ...log, user: userName(data, log.userId) }))}
      />
    </div>
  );
}
