import { useState } from "react";
import Card from "../../components/Card";
import Table from "../../components/Table";
import { Input, Textarea } from "../../components/Form";
import { addAudit, getCurrentUser, loadData, nextId, saveData } from "../../utils/storage";

export default function CalibrationPage() {
  const user = getCurrentUser();
  const [data, setData] = useState(loadData());
  const [form, setForm] = useState({ score: 85, note: "" });

  function submit(e) {
    e.preventDefault();
    const existing = data.calibration.find((c) => Number(c.judgeId) === Number(user.id));
    let updatedCalibration;
    if (existing) {
      updatedCalibration = data.calibration.map((c) => Number(c.judgeId) === Number(user.id) ? { ...c, status: "Completed", score: Number(form.score), note: form.note } : c);
    } else {
      updatedCalibration = [...data.calibration, { id: nextId(data.calibration), judgeId: user.id, status: "Completed", score: Number(form.score), note: form.note }];
    }
    const updated = { ...data, calibration: updatedCalibration };
    addAudit(updated, user.id, "Completed calibration round");
    saveData(updated);
    setData(updated);
    alert("Calibration submitted.");
  }

  return (
    <div className="page">
      <h1>Complete Calibration Round</h1>
      <Card title="Calibration Sample">
        <p>Judge reviews a sample project before official scoring to align scoring criteria.</p>
        <form onSubmit={submit} className="form-grid">
          <Input label="Calibration Score" type="number" value={form.score} onChange={(e) => setForm({ ...form, score: e.target.value })} />
          <Textarea label="Calibration Note" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
          <button className="btn">Submit Calibration</button>
        </form>
      </Card>

      <Table columns={[
        { key: "judgeId", label: "Judge ID" },
        { key: "status", label: "Status" },
        { key: "score", label: "Score" },
        { key: "note", label: "Note" }
      ]} rows={data.calibration} />
    </div>
  );
}
