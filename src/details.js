import './style.css';
import { supabase } from './supabase';

console.log('Details page initialized');
const urlParams = new URLSearchParams(window.location.search);
const jobId = urlParams.get('id');
console.log('Fetching details for ID:', jobId);