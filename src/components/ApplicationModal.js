const modal = document.querySelector("#application-modal");
const form = document.querySelector("#application-modal-form");
const openBtn = document.querySelector("#open-application-modal-btn");
const closeBtn = document.querySelector("#close-application-modal");
const cancelBtn = document.querySelector("#cancel-application-modal");
const titleEl = document.querySelector("#dialog-title");
const descEl = document.querySelector("#dialog-description");

const sections = {
    view: document.querySelector('[data-section="view"]'),
    form: document.querySelector('[data-section="form"]'),
};

function hideAllSections() {
    Object.values(sections).forEach(el => {
        el.hidden = true;
    });
}
``
export function initJobModal() {
    if (!modal || !openBtn) return;

    openBtn.addEventListener("click", open);
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

function open() {
    modal.showModal();
    document.body.style.overflow = "hidden";
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
