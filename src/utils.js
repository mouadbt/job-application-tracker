export const fetchData = async (endpoint, parser = 'json') => {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`Fetch failed: ${endpoint} (${res.status})`);
    return res[parser]();
};
export function fetchDataTest() {
  return new Promise((resolve) => {
    // Simulate data fetching with a delay
    setTimeout(() => {
      resolve("Data fetched successfully");
    }, 2000);
  });
}

export function setStorage(key, data) {
    try {
        sessionStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
        console.error("Failed to save to localStorage", err);
    }
}

export function getStorage(key) {
    try {
        const value = sessionStorage.getItem(key);

        if (value === null) return null;

        return JSON.parse(value);
    } catch (err) {
        console.error("Failed to read from localStorage", err);
        return null;
    }
}

// handle rendering svgs in the page
export function loadSvgIcons() {
    const svgWrappers = document.querySelectorAll('.svg-wrapper');
    svgWrappers.forEach(async (wrapper) => {
        const svgTarget = wrapper.dataset.target;
        if (!svgTarget) return;
        try {
            const svgText = await fetchData(`/icons/${svgTarget}.svg`, 'text');
            const svg = new DOMParser()
                .parseFromString(svgText, 'image/svg+xml')
                .documentElement;
            wrapper.appendChild(svg);
        } catch (err) {
            console.error('Render SVG failed:', err);
        }
    });
}