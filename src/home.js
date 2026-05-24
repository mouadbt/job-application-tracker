import './style.css';
// import { supabase } from './supabase';
import { initJobModal } from './components/ApplicationModal';
import { fetchData, getStorage, setStorage, loadSvgIcons } from './utils';
import { initDropDown } from './components/DropDown';

const DAY_MS = 24 * 60 * 60 * 1000;
const authorEl = document.querySelector("#author-el");
const quoteEl = document.querySelector("#quote-el");
const FALLBACK_QUOTE = {
    author: 'Sam Levenson',
    quote: 'Don’t watch the clock...'
};


async function init() {

    // Initialize modal logic
    initJobModal();

    // Initialize modal logic
    initDropDown();

    // Render svg to page
    loadSvgIcons();

    // Render random Quote
    await renderDailyQuote();

}

init();

// Render Quotes 
function renderQuote({ author, quote }) {
    if (!authorEl || !quoteEl) return;
    authorEl.textContent = author;
    quoteEl.textContent = quote;
}

// Handle rendering quotes
async function renderDailyQuote() {
    const storedQuote = getStorage("Quote:v1");
    let author;
    let quote;
    try {
        // decide operation ( fetch or load )
        const quoteExpired = (storedQuote && Date.now() - storedQuote.savedAt >= DAY_MS);
        const fetchNewQuote =
            !storedQuote ||
            !storedQuote.savedAt ||
            quoteExpired;

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
        renderQuote({ author, quote });
    } catch (err) {
        renderQuote(FALLBACK_QUOTE);
        console.error('Render Quote Failed:', err);
    }
}
