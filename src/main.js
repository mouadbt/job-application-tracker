import './style.css';

import { supabase } from './supabase'

async function test() {
    const { data, error } = await supabase
        .from('applications')
        .select('*')

    console.log(data)
    console.log(error)
}

test();