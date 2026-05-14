import './style.css';
import { supabase } from './supabase';
import { AddJobModal } from './components/AddJobModal';
import { fetchData } from './utils';

// Initialize modal logic
new AddJobModal();


const init = () => {

    // Render svg to page
    handleRenderSvg();

    // Render random Quote
    handleRenderQuote();
}

init();


function handleRenderSvg() {
    const svgWrappers = document.querySelectorAll('.svg-wrapper');
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

async function handleRenderQuote() {
    try {
        const data = await fetchData('https://random-quotes-freeapi.vercel.app/api/random');
        const authorEl = document.querySelector("#author-el");
        const quoteEl = document.querySelector("#quote-el");
        const quote2El = document.querySelector(".table-caption");
        authorEl.textContent = data?.author;
        quoteEl.textContent = data?.quote;
        quote2El.textContent = data?.quote;
    } catch (err) {
        console.error('Render Quote Failed:', err);
    }
}

