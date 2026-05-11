import './style.css';
import { supabase } from './supabase';
import { AddJobModal } from './components/AddJobModal';

console.log('Home page initialized');
// Initialize modal logic
new AddJobModal();