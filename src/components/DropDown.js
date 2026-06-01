const tableBody = document.querySelector('#applications-tbody');
export function initDropDown() {
    tableBody.addEventListener('click', (e) => {
        const btn = e.target.closest('.actions-btn');
        if (!btn) return;

        e.stopPropagation();

        const dropdownEl = btn.nextElementSibling;
        if (!dropdownEl) return;
        const isHidden = dropdownEl.hidden;

        closeAllDropdowns();
        dropdownEl.hidden = !isHidden;
    });

    document.addEventListener('click', closeAllDropdowns);
}

function closeAllDropdowns() {
    document.querySelectorAll('.actions-dropdown').forEach(el => el.hidden = true);
}