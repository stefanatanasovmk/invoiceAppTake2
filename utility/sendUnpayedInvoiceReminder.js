const Invoice = require("../models/invoice")
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_EMAIL_API_KEY);
const sendEmailRemainderLateInvoices = async function () {
     const invoices = await Invoice.find().populate("clientInfo").populate("companyInfo")
     for (let i of invoices) {
          if (!i.payed && i.clientInfo.email) {
               const msg = {
                    to: i.clientInfo.email,
                    from: 'atanasovstefan@hotmail.com',
                    subject: 'Имате неплатена сметка',
                    text: `Имате неплатенa фактура од вредност во ${i.total.total} кон ${i.companyInfo.companyName}.
                    Рокот за плаќање беше до ${i.invoiceInfo.paymentDate}`,
                    // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
               };
               try {
                    await sgMail.send(msg)
                    console.log("sent")

               } catch (e) {
                    console.log("email wasn't sent")
                    console.log(e)
               }

          }
     }
}
module.exports = sendEmailRemainderLateInvoices