const USERNAME = import.meta.env.VITE_DASHBOARD_USER;
const PASSWORD = import.meta.env.VITE_DASHBOARD_PASSWORD;
const API_HOST = import.meta.env.VITE_DASHBOARD_API_URL;
const TOKEN = btoa(`${USERNAME}:${PASSWORD}`);

const headers = {
  Authorization: `Basic ${TOKEN}`,
  'Content-Type': 'application/json'
};

export async function get<T>(url: string): Promise<T> {
  const apiUrl = _getApiUrl(url);
  const res = await fetch(apiUrl, {
    method: "GET",
    headers: headers,
    credentials: "include"
  });

  if (!res.ok) {
    console.log(`System API error ${res.status}: ${res.statusText}`)
    alert("Error!");
  }

  return (await res.json()) as T;
}

export async function post<T>(url: string): Promise<T> {
  const apiUrl = _getApiUrl(url);
  const res = await fetch(apiUrl, {
    method: "POST",
    headers,
    credentials: "include"
  });

  if (!res.ok) {
    console.log(`System API error ${res.status}: ${res.statusText}`)
    alert("Error!");
  }

  return (await res.json()) as T;
}

function _getApiUrl(url: string): string {
  return `${API_HOST}/${url}`;
}