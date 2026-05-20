export async function fetchStrapi(endpoint: string, options: RequestInit = {}) {
  // Server-side: use internal Docker URL (or localhost for dev)
  // Client-side: use public URL
  const isServer = typeof window === 'undefined';
  const baseUrl = isServer
    ? (process.env.STRAPI_INTERNAL_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337')
    : (process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337');
  
  const url = `${baseUrl}${endpoint}`;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Attach the API token when available (set STRAPI_API_TOKEN in .env.local)
  const token = process.env.STRAPI_API_TOKEN;
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const headers = {
    ...defaultHeaders,
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Error fetching ${url}: ${response.statusText}`);
  }

  return response.json();
}