// import { fetchData, fetchDataTest } from "../utils";

// const modal = document.querySelector("#application-modal");
// const form = document.querySelector("#application-modal-form");
// const newBtn = document.querySelector("#new-application-modal-btn");
// const closeBtn = document.querySelector("#close-application-modal");
// const cancelBtn = document.querySelector("#cancel-application-modal");
// const titleEl = document.querySelector("#dialog-title");
// const descEl = document.querySelector("#dialog-description");
// const loaderEl = document.querySelector("#loader");
// const editBtns = document.querySelectorAll(".edit-application");

// const sections = {
//     view: document.querySelector('[data-section="view"]'),
//     form: document.querySelector('[data-section="form"]'),
// }

// function hideAllSections() {
//     Object.values(sections).forEach(el => {
//         el.hidden = true;
//     });
// }

// export function initJobModal() {
//     if (!modal) return;

//     if (newBtn) { newBtn.addEventListener("click", () => open('form', 'new', 'New Application', 'Add a new job application to your tracker.')) };

//     editBtns.forEach((el) => {
//         const id = el.dataset.id;
//         el.addEventListener("click", () => open('form', 'edit', 'Edit Application', 'Update job application informations.', id));
//     });

//     closeBtn?.addEventListener("click", close);
//     cancelBtn?.addEventListener("click", close);

//     // Close on backdrop click
//     modal.addEventListener("click", (e) => {
//         if (e.target === modal) {
//             close();
//         }
//     });

//     // Handle native "cancel" (Escape key)
//     modal.addEventListener("cancel", () => {
//         close();
//     });

//     // Handle form submission
//     form?.addEventListener("submit", (e) => {
//         e.preventDefault();
//         handleSubmit();
//     });
// }

// async function open(target, action, title, desc, id = null) {
//     openModal(title, desc, target);
//     if (action === 'new') loaderEl.hidden = true;
//     let applicationData = {};
//     if (action !== 'new') {
//         applicationData = await fetchApplicationData(id);
//     }
//     if (applicationData) {
//         handleRenderingApplicationData(applicationData, action);
//     }
// }

// function handleRenderingApplicationData(applicationData, action) {
//     if (action === 'view') {
//         renderApplicationDetails(applicationData);
//     } else {
//         renderApplicationFormData(applicationData);
//     }
// }

// function renderApplicationDetails(applicationData) {
//     console.log(applicationData);
// }

// function renderApplicationFormData(applicationData) {
//     console.log(applicationData);
// }

// async function fetchApplicationData(id) {
//     // 'https://catfact.ninja/fact' 
//     try {
//         const res = await fetchDataTest(id);
//         return await res.json();
//     } catch (err) {
//         console.error("Error fetching applicatio data: ", err);
//     }
// }

// // Open modal and perform all actions related to it regardless of the target or action
// function openModal(title, desc, target) {
//     hideAllSections();
//     modal.showModal();
//     document.body.style.overflow = "hidden";
//     titleEl.textContent = title;
//     descEl.textContent = desc;
//     sections[target].hidden = false;
// }

// // close modal
// function close() {
//     modal.close();
//     document.body.style.overflow = "";
//     form?.reset();
//     loaderEl.hidden = false;
// }

// // handle submission of the application form 
// function handleSubmit() {
//     const formData = new FormData(form);
//     const data = Object.fromEntries(formData.entries());
//     console.log("Form data:", data);

//     // Custom event to notify parent about new application
//     const event = new CustomEvent('job-application-added', { detail: data });
//     document.dispatchEvent(event);

//     close();
// }

import { fetchData, fetchDataTest } from "../utils";

// const modal = document.querySelector("#application-modal");
// const form = document.querySelector("#application-modal-form");
const tableBody = document.querySelector('#applications-tbody');

export function initJobModal() {
    tableBody.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;

        const action = btn.dataset.action; // 'view' | 'edit' | 'delete'
        const id = btn.dataset.id;

        if (action === 'view') {
            console.log(id);
        }
        if (action === 'edit') {
            console.log(id);
        }
        if (action === 'delete') {
            console.log(id);
        }
    });
}
