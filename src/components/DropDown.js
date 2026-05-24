const actionsBtns = document.querySelectorAll('.actions-btn');
const actionsDropDownEls = document.querySelectorAll('.actions-dropdown');
export function initDropDown() {
    actionsBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();

            const dropdownEl = btn.nextElementSibling;
            if (!dropdownEl) return;
            const isHidden = dropdownEl.hidden;

            actionsDropDownEls.forEach(el => el.hidden = true);

            dropdownEl.hidden = !isHidden;
        });

    });

    document.addEventListener("click", () => {
        actionsDropDownEls.forEach(el => el.hidden = true);
    });
}