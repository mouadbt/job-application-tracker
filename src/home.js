import './style.css';
import { supabase } from './supabase';
import { initAddJobModal } from './components/AddJobModal';
import { fetchData, getStorage, setStorage } from './utils';

const DAY_MS = 24 * 60 * 60 * 1000;
const authorEl = document.querySelector("#author-el");
const quoteEl = document.querySelector("#quote-el");
const openApplicationModalBtn = document.querySelector("#open-application-modal-btn");
const applicationModalForm = document.querySelector("#application-modal-form");

// Initialize modal logic
initAddJobModal();


const init = () => {

    // Render svg to page
    handleRenderSvg();

    // Render random Quote
    handleRenderQuote();
}

init();

// handle rendering svgs in the page
function handleRenderSvg() {
    const svgWrappers = document.querySelectorAll('.svg-wrapper, .link-external-icon, .table-action-btn, .add-job-btn, .hero-card');
    svgWrappers.forEach(async (wrapper) => {
        const svgTarget = wrapper.dataset.target;
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

// Render Quotes 
function renderQuotes(author, quote) {
    if (!authorEl || !quoteEl) return;
    authorEl.textContent = author;
    quoteEl.textContent = quote;
}

// Handle rendering quotes
async function handleRenderQuote() {
    const storedQuote = getStorage("Quote:v1");
    let author = '';
    let quote = '';
    try {
        // decide operation ( fetch or load )
        const fetchNewQuote =
            !storedQuote ||
            !storedQuote.savedAt ||
            Date.now() - storedQuote.savedAt >= DAY_MS;

        // fetch or load
        if (fetchNewQuote) {
            const data = await fetchData('https://random-quotes-freeapi.vercel.app/api/random');

            if (!data?.author || !data?.quote) {
                throw new Error("Invalid quote data");
            }

            author = data.author;
            quote = data.quote;

            setStorage("Quote:v1", { author, quote, savedAt: Date.now() });
        } else {
            author = storedQuote?.author;
            quote = storedQuote?.quote;
        }

        // Render
        renderQuotes(author, quote);
    } catch (err) {
        renderQuotes('Sam Levenson', 'Don’t watch the clock; do what it does. Keep going.');
        console.error('Render Quote Failed:', err);
    }
}

