require('dotenv').config();
const { Xendit } = require('xendit-node');

const xenditClient = new Xendit({ secretKey: process.env.XENDIT_SECRET_KEY });
const { Invoice } = xenditClient;

async function checkInvoice() {
    try {
        const response = await Invoice.getInvoiceById({ invoiceId: '69ad7bf8276cf90a6cea0fc1' });
        console.log("INVOICE 6CEA0FC1:");
        console.log(JSON.stringify(response.metadata, null, 2));

        const response2 = await Invoice.getInvoiceById({ invoiceId: '69ad7d7bef3260483568d34c' });
        console.log("INVOICE 3568D34C:");
        console.log(JSON.stringify(response2.metadata, null, 2));
    } catch (err) {
        console.error(err);
    }
}
checkInvoice();
