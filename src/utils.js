export const fetchData = async (endpoint, parser = 'json') => {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`Fetch failed: ${endpoint} (${res.status})`);
    return res[parser]();
};