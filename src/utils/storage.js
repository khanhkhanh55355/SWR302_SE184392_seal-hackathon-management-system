import { initialData } from "../data/mockData";

const DATA_KEY = "seal_hms_full_data";
const USER_KEY = "seal_hms_current_user";

export function loadData() {
  const raw = localStorage.getItem(DATA_KEY);
  if (!raw) {
    localStorage.setItem(DATA_KEY, JSON.stringify(initialData));
    return structuredClone(initialData);
  }
  return JSON.parse(raw);
}

export function saveData(data) {
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

export function resetData() {
  localStorage.setItem(DATA_KEY, JSON.stringify(initialData));
  return structuredClone(initialData);
}

export function nextId(items) {
  return items.length ? Math.max(...items.map((item) => Number(item.id))) + 1 : 1;
}

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem(USER_KEY) || "null");
}

export function setCurrentUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function logout() {
  localStorage.removeItem(USER_KEY);
}

export function addAudit(data, userId, action) {
  data.auditLogs.unshift({
    id: nextId(data.auditLogs),
    userId,
    action,
    createdAt: new Date().toLocaleString()
  });
}
