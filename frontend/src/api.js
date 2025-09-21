import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// optional: set auth token
export function setToken(token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export async function fetchBorrowers() {
  const res = await api.get("/borrowers/");
  return res.data;
}

export async function createBorrower(payload) {
  const res = await api.post("/borrowers/", payload);
  return res.data;
}

export async function createLoan(payload) {
  const res = await api.post("/loans/", payload);
  return res.data;
}

export async function predict(payload) {
  const res = await api.post("/predict/", payload);
  return res.data;
}

export default api;
