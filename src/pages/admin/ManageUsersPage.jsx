import { useState } from "react";
import Card from "../../components/Card";
import Table from "../../components/Table";
import Badge from "../../components/Badge";
import { Input, Select } from "../../components/Form";
import { addAudit, getCurrentUser, loadData, nextId, saveData } from "../../utils/storage";

export default function ManageUsersPage() {
  const admin = getCurrentUser();
  const [data, setData] = useState(loadData());
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ fullName: "", email: "", password: "123456", role: "TEAM", status: "Active" });

  function resetForm() {
    setEditingId(null);
    setForm({ fullName: "", email: "", password: "123456", role: "TEAM", status: "Active" });
  }

  function edit(user) {
    setEditingId(user.id);
    setForm({ fullName: user.fullName, email: user.email, password: user.password, role: user.role, status: user.status });
  }

  function submit(e) {
    e.preventDefault();
    if (!form.fullName || !form.email) return alert("Full name and email are required.");
    let updatedUsers;
    if (editingId) {
      updatedUsers = data.users.map((u) => Number(u.id) === Number(editingId) ? { ...u, ...form } : u);
    } else {
      updatedUsers = [{ id: nextId(data.users), ...form }, ...data.users];
    }
    const updated = { ...data, users: updatedUsers };
    addAudit(updated, admin.id, editingId ? `Updated user ${form.email}` : `Created user ${form.email}`);
    saveData(updated);
    setData(updated);
    resetForm();
  }

  function toggleStatus(user) {
    const updatedUsers = data.users.map((u) => Number(u.id) === Number(user.id) ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u);
    const updated = { ...data, users: updatedUsers };
    addAudit(updated, admin.id, `Changed user status ${user.email}`);
    saveData(updated);
    setData(updated);
  }

  return (
    <div className="page">
      <h1>Manage Users</h1>
      <Card title={editingId ? "Edit User" : "Create User"}>
        <form onSubmit={submit} className="form-grid">
          <Input label="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
          <Input label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input label="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <Select label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option>TEAM</option>
            <option>MENTOR</option>
            <option>JUDGE</option>
            <option>COORDINATOR</option>
            <option>ADMIN</option>
          </Select>
          <Select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option>Active</option>
            <option>Inactive</option>
          </Select>
          <div className="button-row">
            <button className="btn">{editingId ? "Update User" : "Create User"}</button>
            {editingId && <button type="button" className="btn outline" onClick={resetForm}>Cancel</button>}
          </div>
        </form>
      </Card>

      <Table
        columns={[
          { key: "fullName", label: "Name" },
          { key: "email", label: "Email" },
          { key: "role", label: "Role" },
          { key: "status", label: "Status", render: (r) => <Badge tone={r.status === "Active" ? "success" : "danger"}>{r.status}</Badge> }
        ]}
        rows={data.users}
        actions={(row) => (
          <>
            <button className="table-btn" onClick={() => edit(row)}>Edit</button>
            <button className="table-btn danger" onClick={() => toggleStatus(row)}>Toggle</button>
          </>
        )}
      />
    </div>
  );
}
