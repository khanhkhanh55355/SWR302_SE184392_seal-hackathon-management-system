import Card from "../../components/Card";
import Table from "../../components/Table";
import { loadData } from "../../utils/storage";

export default function DataOverviewPage() {
  const data = loadData();
  const rows = Object.keys(data)
    .filter((key) => Array.isArray(data[key]))
    .map((key, index) => ({ id: index + 1, entity: key, records: data[key].length }));

  return (
    <div className="page">
      <h1>Data Overview</h1>
      <div className="grid four">
        <Card title="ERD Entities" value="11" />
        <Card title="Mock Tables" value={rows.length} />
        <Card title="Total Records" value={rows.reduce((sum, r) => sum + r.records, 0)} />
        <Card title="Storage" value="LocalStorage" />
      </div>
      <Table columns={[
        { key: "entity", label: "Entity" },
        { key: "records", label: "Records" }
      ]} rows={rows} />
    </div>
  );
}
