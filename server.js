require('dotenv').config();
const express = require('express');
const path = require('path');
const { Xendit } = require('xendit-node');
const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');

const app = express();
const PORT = process.env.PORT || 8889;

// Xendit Setup
const xenditClient = new Xendit({ secretKey: process.env.XENDIT_SECRET_KEY });
const { Invoice } = xenditClient;

// Supabase Setup
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, './')));

// Custom route for animation logo
app.use('/animation-logo', express.static(path.join(__dirname, 'animation logo')));

// Health Check
app.get('/health', (req, res) => res.status(200).send('OK'));

// --- API ROUTES ---

// 1. Create Xendit Invoice
app.post('/api/create-invoice', async (req, res) => {
    try {
        const { items, customerEmail, customerWA, customerName } = req.body;
        const origin = process.env.PUBLIC_URL || req.headers.origin || 'https://printwork.id';

        const amount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Fallback email if user didn't provide one (since it's now optional)
        const finalEmail = customerEmail && customerEmail.trim() !== ''
            ? customerEmail
            : `no-reply-${Date.now()}@printwork.id`;

        const data = {
            amount,
            externalId: `invoice-${Date.now()}`,
            payerEmail: finalEmail,
            description: `Order from PT Printwork Indonesia`,
            invoiceDuration: 172800, // 2 days
            successRedirectUrl: `${origin}/shop.html?success=true`,
            failureRedirectUrl: `${origin}/shop.html?canceled=true`,
            currency: 'IDR',
            items: items.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            metadata: {
                order_items: JSON.stringify(items),
                customer_wa: customerWA,
                customer_name: customerName
            }
        };

        const response = await Invoice.createInvoice({ data });
        res.json({ id: response.id, url: response.invoiceUrl });
    } catch (err) {
        console.error('Xendit Error:', err);
        res.status(500).json({ error: err.message });
    }
});

// 2. Xendit Webhook (Callback)
app.post('/api/callback', async (req, res) => {
    try {
        // Xendit Callback Token Verification
        const callbackToken = req.headers['x-callback-token'];
        if (callbackToken !== process.env.XENDIT_WEBHOOK_TOKEN) {
            return res.status(403).send('Invalid callback token');
        }

        const callbackData = req.body;

        // Only process paid invoices
        if (callbackData.status === 'PAID') {
            const { id, payer_email, amount } = callbackData;

            // Xendit callback payload may NOT include metadata. We fetch it explicitly:
            let metadata = callbackData.metadata;
            try {
                const invoiceDetails = await Invoice.getInvoiceById({ invoiceId: id });
                if (invoiceDetails && invoiceDetails.metadata) {
                    metadata = invoiceDetails.metadata;
                }
            } catch (e) {
                console.error("Failed fetching invoice details in webhook:", e);
            }

            const customerWA = metadata ? (metadata.customer_wa || '') : '';
            const customerName = metadata ? (metadata.customer_name || '') : '';

            // Record to Supabase
            let { error } = await supabase
                .from('orders')
                .insert([{
                    xendit_invoice_id: id,
                    customer_email: payer_email,
                    customer_wa: customerWA,
                    customer_name: customerName,
                    amount: amount,
                    status: 'paid',
                    items: metadata ? JSON.parse(metadata.order_items) : []
                }]);

            if (error) {
                console.error('Supabase Error (1st attempt):', error);
                // Fallback attempt for typo 'customor_name'
                if (error.code === '42703' || error.message.includes('column')) {
                    const { error: err2 } = await supabase.from('orders').insert([{
                        xendit_invoice_id: id,
                        customer_email: payer_email,
                        customer_wa: customerWA,
                        customor_name: customerName,
                        amount: amount,
                        status: 'paid',
                        items: metadata ? JSON.parse(metadata.order_items) : []
                    }]);

                    if (err2) {
                        console.error('Supabase Error (2nd attempt):', err2);
                        // Final fallback without any custom columns
                        await supabase.from('orders').insert([{
                            xendit_invoice_id: id,
                            customer_email: payer_email,
                            amount: amount,
                            status: 'paid',
                            items: metadata ? JSON.parse(metadata.order_items) : []
                        }]);
                    }
                }
            }

            // Send Email via Resend
            const adminEmail = process.env.ADMIN_EMAIL || 'printworkmultigraph@gmail.com';
            await resend.emails.send({
                from: 'PT Printwork <orders@printwork.id>',
                to: [payer_email, adminEmail],
                subject: 'Order Confirmation - PT Printwork Indonesia',
                html: `<h1>Terima kasih ${customerName || 'atas pesanan Anda'}!</h1>
                       <p>Kami telah menerima pembayaran sebesar IDR ${amount.toLocaleString('id-ID')}.</p>
                       <p><strong>Detail Kontak:</strong></p>
                       <ul>
                         <li>Nama: ${customerName || '-'}</li>
                         <li>Email: ${payer_email}</li>
                         <li>WhatsApp: ${customerWA || '-'}</li>
                       </ul>
                       <p>Pesanan Anda sedang kami proses.</p>`
            });
        }

        res.json({ received: true });
    } catch (err) {
        console.error('Callback Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

// 3. Get Orders (Admin)
app.get('/api/orders', async (req, res) => {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// 4. Clear Orders (Hidden Admin Feature)
app.post('/api/clear-orders', async (req, res) => {
    try {
        const password = req.headers['x-admin-password'];
        if (!password || password !== 'Printwork180308') {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const { error } = await supabase
            .from('orders')
            .delete()
            .neq('id', 0); // Delete all rows

        if (error) throw error;
        res.json({ success: true, message: 'All orders cleared' });
    } catch (err) {
        console.error('Clear Orders Error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Serve the admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

app.listen(PORT, () => {
    console.log(`Server optimized with Express running at http://localhost:${PORT}/`);
});

module.exports = app;

