// Base API URL from environment
export const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000';

// GET request helper
export async function getRequest(endpoint: string) {
  const response = await fetch(`${API_URL}${endpoint}`);
  if (!response.ok) throw new Error('Request failed');
  return response.json();
}

// POST request helper
export async function postRequest(endpoint: string, data: any) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Request failed');
  return response.json();
}
