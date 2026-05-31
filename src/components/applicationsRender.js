import { supabase } from '../supabase';

let applicationsRows = [];
const tableBody = document.querySelector("#applications-tbody");

export async function initApplications() {
    try {
        applicationsRows = await fetchApplications();
        if (applicationsRows) {
            renderApplications(applicationsRows);
        }
    } catch (error) {
        console.log("Error fetching job applications: ", error);
    }

};

async function fetchApplications() {
    const { data, error } = await supabase.from('applications').select('*');
    if (error) throw error;
    return data;
}

function renderApplications() {
    if (!tableBody || !applicationsRows) return;
    console.log({ tableBody, applicationsRows });
}