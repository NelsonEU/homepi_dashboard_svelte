const API_HOST = import.meta.env.VITE_DASHBOARD_API_URL;

export async function get<T>(url: string): Promise<T> {
  const apiUrl = _getApiUrl(url);
  const res = await fetch(apiUrl, {
    method: "GET",
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
    credentials: "include"
  });

  if (!res.ok) {
    console.log(`System API error ${res.status}: ${res.statusText}`)
    alert("Error!");
  }

  return (await res.json()) as T;
}

function _getApiUrl(url: string): string {
  return `${API_HOST}/api/${url}`;
}