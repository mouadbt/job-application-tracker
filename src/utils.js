export const fetchData = async (endpoint, parser = 'json') => {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`Fetch failed: ${endpoint} (${res.status})`);
    return res[parser]();
};


export function setStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
        console.error("Failed to save to localStorage", err);
    }
}

export function getStorage(key) {
    try {
        const value = localStorage.getItem(key);

        if (value === null) return null;

        return JSON.parse(value);
    } catch (err) {
        console.error("Failed to read from localStorage", err);
        return null;
    }
}