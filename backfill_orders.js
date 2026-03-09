require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { Xendit } = require('xendit-node');

const supabaseUrl = process.env.SUPABASE_URL || 'https://fjlngiuspkyxqvuzeoyu.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqbG5naXVzcGt5eHF2dXplb3l1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSI6MTc3Mjk2MDAwNCwiZXhwIjoyMDg4NTM2MDA0fQ.XQbf2tZcz53vFUganF-N1gFBQ8TgfB4R8O_mTfME9Xk';
const supabase = createClient(supabaseUrl, supabaseKey);

const xenditClient = new Xendit({ secretKey: process.env.XENDIT_SECRET_KEY });
const { Invoice } = xenditClient;

async function backfill() {
    console.log("Fetching orders with missing names...");
    // get recent orders where customor_name is empty or null AND customer_name is empty or null
    const { data: orders, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(10);

    if (error) {
        console.error(error);
        return;
    }

    for (let order of orders) {
        if (!order.customer_name && !order.customor_name) {
            console.log(`Fixing order ${order.xendit_invoice_id}...`);
            try {
                const inv = await Invoice.getInvoiceById({ invoiceId: order.xendit_invoice_id });
                if (inv && inv.metadata) {
                    const wa = inv.metadata.customer_wa || '';
                    const name = inv.metadata.customer_name || '';

                    if (name || wa) {
                        console.log(`Found: Name=${name}, WA=${wa}`);
                        const { error: updErr } = await supabase
                            .from('orders')
                            .update({
                                customor_name: name, // We use the user's typo column
                                customer_wa: wa
                            })
                            .eq('id', order.id);
                        if (updErr) {
                            console.error(`Update error for ${order.id}:`, updErr);
                        } else {
                            console.log(`Successfully updated ${order.id}`);
                        }
                    }
                }
            } catch (e) {
                console.error(`Failed to fetch invoice ${order.xendit_invoice_id}`);
            }
        }
    }
    console.log("Backfill complete.");
}

backfill();
