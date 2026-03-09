require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || 'https://fjlngiuspkyxqvuzeoyu.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqbG5naXVzcGt5eHF2dXplb3l1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSI6MTc3Mjk2MDAwNCwiZXhwIjoyMDg4NTM2MDA0fQ.XQbf2tZcz53vFUganF-N1gFBQ8TgfB4R8O_mTfME9Xk';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLatest() {
    const { data: orders, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(3);
    if (error) {
        console.error("Error", error);
    } else {
        console.dir(orders, { depth: null });
    }
}
checkLatest();
