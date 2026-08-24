const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers || {})
        }
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}

export const api = {
  register: (payload) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload)
    }),

  login: (payload) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload)
    }),

  me: (token) =>
    request("/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    }),

  transactions: (token) =>
    request("/transactions", {
      headers: { Authorization: `Bearer ${token}` }
    }),

  createTransaction: (token, payload) =>
    request("/transactions", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    }),

  updateTransaction: (token, id, payload) =>
    request(`/transactions/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload)
    }),

  deleteTransaction: (token, id) =>
    request(`/transactions/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
};
