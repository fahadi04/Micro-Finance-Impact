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

export async function createBorrower(data) {
  return axios
    .post("http://localhost:8000/api/borrowers/", data)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export async function getBorrowers() {
  return axios
    .get("http://localhost:8000/api/borrowers/list/")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
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
