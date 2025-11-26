// DO NOT PUSH THAT
const USER = "admin";
const PASS = "ajax-rubs-shut-warms";
const TOKEN = btoa(`${USER}:${PASS}`);

const headers = {
  Authorization: `Basic ${TOKEN}`,
  'Content-Type': 'application/json'
};

export async function get<T>(url: string): Promise<T> {
  const res = await fetch(url, {
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
  const res = await fetch(url, {
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