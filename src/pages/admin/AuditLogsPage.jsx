import Table from "../../components/Table";
import { loadData } from "../../utils/storage";
import { userName } from "../../utils/helpers";

export default function AuditLogsPage() {
  const data = loadData();

  return (
    <div className="page">
      <h1>View Audit Logs</h1>
      <Table
        columns={[
          { key: "id", label: "ID" },
          { key: "user", label: "User" },
          { key: "action", label: "Action" },
          { key: "createdAt", label: "Created At" }
        ]}
        rows={data.auditLogs.map((log) => ({ ...log, user: userName(data, log.userId) }))}
      />
    </div>
  );
}
