require('dotenv').config();
const { Xendit } = require('xendit-node');

const xenditClient = new Xendit({ secretKey: process.env.XENDIT_SECRET_KEY });
const { Invoice } = xenditClient;

async function checkInvoice() {
    try {
        const inv = await Invoice.getInvoiceById({ invoiceId: '69ad7f70ef3260483568d53c' });
        console.log("ASEP INVOICE:");
        console.log(JSON.stringify(inv.metadata, null, 2));
    } catch (err) {
        console.error("Error xendit:", err);
    }
}
checkInvoice();
