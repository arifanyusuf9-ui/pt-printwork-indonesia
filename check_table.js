require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Fallback to the known ones if env not loaded properly
const supabaseUrl = process.env.SUPABASE_URL || 'https://fjlngiuspkyxqvuzeoyu.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqbG5naXVzcGt5eHF2dXplb3l1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSI6MTc3Mjk2MDAwNCwiZXhwIjoyMDg4NTM2MDA0fQ.XQbf2tZcz53vFUganF-N1gFBQ8TgfB4R8O_mTfME9Xk';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTable() {
    console.log("Checking Supabase 'orders' table...");
    try {
        const { data, error } = await supabase.from('orders').select('*').limit(1);
        if (error) {
            console.error("Error fetching data:", error);
            return;
        }

        if (data && data.length > 0) {
            console.log("Columns present in 'orders':");
            console.log(Object.keys(data[0]));
        } else {
            console.log("No data found, but table is accessible.");
        }

        // Also let's try pushing a test row with customer_wa
        const { error: insertError } = await supabase.from('orders').insert([
            {
                xendit_invoice_id: 'test_insert',
                customer_email: 'test@test.com',
                customer_wa: '0812',
                customer_name: 'Test',
                amount: 0,
                status: 'test'
            }
        ]);

        if (insertError) {
            console.log("Insert Error:", insertError.message);
        } else {
            console.log("Insert Success! The columns exist.");
            // Clean up
            await supabase.from('orders').delete().eq('xendit_invoice_id', 'test_insert');
        }
    } catch (err) {
        console.error("Exception:", err);
    }
}

checkTable();
