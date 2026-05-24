import { fetchData } from "../utils";

const modal = document.querySelector("#application-modal");
const form = document.querySelector("#application-modal-form");
const openBtn = document.querySelector("#open-application-modal-btn");
const closeBtn = document.querySelector("#close-application-modal");
const cancelBtn = document.querySelector("#cancel-application-modal");
const titleEl = document.querySelector("#dialog-title");
const descEl = document.querySelector("#dialog-description");
const loaderEl = document.querySelector("#loader");

const sections = {
    view: document.querySelector('[data-section="view"]'),
    form: document.querySelector('[data-section="form"]'),
};

function hideAllSections() {
    Object.values(sections).forEach(el => {
        el.hidden = true;
    });
}

export function initJobModal() {
    if (!modal) return;

    if (openBtn) { openBtn.addEventListener("click", () => open('form', null)) };

    closeBtn?.addEventListener("click", close);
    cancelBtn?.addEventListener("click", close);

    // Close on backdrop click
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            close();
        }
    });

    // Handle native "cancel" (Escape key)
    modal.addEventListener("cancel", () => {
        close();
    });

    // Handle form submission
    form?.addEventListener("submit", (e) => {
        e.preventDefault();
        handleSubmit();
    });
}

async function open(target, data) {
    openModel();
    if (!data) loaderEl.hidden = true;
    sections[target].hidden = false;
    let applicationData = {};
    if (data) {
        applicationData = await fetchApplicationData();
    }
    if (applicationData) {
        console.log(applicationData);
    }
}

function openModel() {
    hideAllSections();
    modal.showModal();
    document.body.style.overflow = "hidden";
}

async function fetchApplicationData() {
    try {
        const res = fetchData('https://catfact.ninja/fact');
        return await res.json();
    } catch (err) {
        console.error("Error fetching applicatio data: ", err);
    }
}

function close() {
    modal.close();
    document.body.style.overflow = "";
    form?.reset();
}

function handleSubmit() {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log("Form data:", data);

    // Custom event to notify parent about new application
    const event = new CustomEvent('job-application-added', { detail: data });
    document.dispatchEvent(event);

    close();
}
