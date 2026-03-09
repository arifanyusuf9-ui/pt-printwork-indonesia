const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    'https://fjlngiuspkyxqvuzeoyu.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqbG5naXVzcGt5eHF2dXplb3l1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSI6MTc3Mjk2MDAwNCwiZXhwIjoyMDg4NTM2MDA0fQ.XQbf2tZcz53vFUganF-N1gFBQ8TgfB4R8O_mTfME9Xk'
);

async function addColumns() {
    // Try to add columns using rpc or raw SQL
    const { data, error } = await supabase.rpc('exec_sql', {
        query: "ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_name TEXT DEFAULT ''; ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_wa TEXT DEFAULT '';"
    });

    if (error) {
        console.log('RPC method not available, trying alternative...');
        // Alternative: just check if columns exist by querying
        const { data: orders, error: err2 } = await supabase.from('orders').select('*').limit(1);
        if (err2) {
            console.error('Error:', err2);
        } else {
            console.log('Current columns:', orders.length > 0 ? Object.keys(orders[0]) : 'No orders yet');
            console.log('You need to add columns manually in Supabase Dashboard:');
            console.log('1. Go to https://supabase.com/dashboard');
            console.log('2. Open your project -> Table Editor -> orders');
            console.log('3. Click "+ Add Column" and add:');
            console.log('   - customer_name (text, nullable)');
            console.log('   - customer_wa (text, nullable)');
        }
    } else {
        console.log('Columns added successfully!', data);
    }
}

addColumns();
