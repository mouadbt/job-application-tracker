import { supabase } from '../supabase';

let applicationsRows = [];
const tableBody = document.querySelector("#applications-tbody");

export async function initApplications() {
    try {
        const rows = await fetchApplications();
        renderApplications(rows);
    } catch (error) {
        console.log("Error fetching job applications: ", error);
    }
};

async function fetchApplications() {
    const { data, error } = await supabase.from('applications').select('*');
    if (error) throw error;
    console.log(data);
    return data;
}

function renderApplications(rows) {
    if (!tableBody || !rows.length) return;

    const fragment = document.createDocumentFragment();

    rows.forEach(row => {
        const tr = document.createElement('tr');
        tr.className = 'group';

        // company
        const companyTd = document.createElement('td');
        companyTd.className = 'table-td flex items-center gap-3';
        const logo = document.createElement('div');
        logo.className = 'c-logo';
        logo.textContent = row.company[0].toUpperCase();
        const companyName = document.createElement('div');
        companyName.className = 'font-semibold text-foreground';
        companyName.textContent = row.company;
        companyTd.append(logo, companyName);

        // position
        const positionTd = document.createElement('td');
        positionTd.className = 'table-td';
        const positionSpan = document.createElement('span');
        positionSpan.className = 'font-medium';
        positionSpan.textContent = row.position;
        positionTd.append(positionSpan);

        // status
        const statusTd = document.createElement('td');
        statusTd.className = 'table-td';
        const statusBadge = document.createElement('span');
        statusBadge.className = 'badge';
        statusBadge.textContent = row.status;
        statusTd.append(statusBadge);

        // job url
        const urlTd = document.createElement('td');
        urlTd.className = 'table-td';
        if (row.job_url) {
            const link = document.createElement('a');
            link.href = row.job_url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'hover:text-primary transition-colors inline-flex items-center gap-1 group/link';
            link.textContent = 'View Post';
            const linkIcon = document.createElement('span');
            linkIcon.className = 'svg-wrapper group-hover/link:opacity-100 group-hover/link:translate-x-0 link-icon group-focus/link:opacity-100 group-focus/link:translate-x-0';
            linkIcon.dataset.target = 'external-link';
            link.append(linkIcon);
            urlTd.append(link);
        }

        // notes
        const notesTd = document.createElement('td');
        notesTd.className = 'table-td max-w-60';
        const notesP = document.createElement('p');
        notesP.className = 'truncate';
        notesP.textContent = row.notes || '—';
        notesTd.append(notesP);

        // actions
        const actionsTd = document.createElement('td');
        actionsTd.className = 'table-td text-right relative';

        const actionsBtn = document.createElement('button');
        actionsBtn.className = 'actions-btn btn-icon svg-wrapper group-hover:opacity-100';
        actionsBtn.dataset.target = 'more-vertical';

        const dropdown = document.createElement('div');
        dropdown.className = 'actions-dropdown fixed mt-1 right-8! rounded-3xl bg-background p-1 flex flex-col border border-border';
        dropdown.dataset.id = row.id;
        dropdown.hidden = true;

        const viewBtn = document.createElement('button');
        viewBtn.className = 'btn-ghost svg-wrapper edit-application';
        viewBtn.dataset.target = 'eye';
        viewBtn.dataset.id = row.id;
        viewBtn.textContent = 'View';

        const editBtn = document.createElement('button');
        editBtn.className = 'btn-ghost svg-wrapper edit-application';
        editBtn.dataset.target = 'pen';
        editBtn.dataset.id = row.id;
        editBtn.textContent = 'Edit';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-ghost svg-wrapper';
        deleteBtn.dataset.target = 'trash';
        deleteBtn.dataset.id = row.id;
        deleteBtn.textContent = 'Delete';

        dropdown.append(viewBtn, editBtn, deleteBtn);
        actionsTd.append(actionsBtn, dropdown);

        tr.append(companyTd, positionTd, statusTd, urlTd, notesTd, actionsTd);
        fragment.append(tr);
    });

    tableBody.append(fragment);
}