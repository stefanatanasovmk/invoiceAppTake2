const express = require("express")
const router = express.Router()
const checkVerification = require("../utility/checkVerification")
const checkAuthenticated = require("../utility/isLoggedIn")
const Invoice = require("../models/invoice");
const User = require("../models/user")
const Client = require("../models/client");
//Show invoice
router.get("/invoice/:id", checkAuthenticated, checkVerification, async (req, res) => {
     res.render("table")
})

//Show all invoices
router.get("/myinvoices", checkAuthenticated, checkVerification, async (req, res) => {
     res.render("myInvoices")
})

//Add invoice
router.post("/saveInvoice", checkAuthenticated, checkVerification, async (req, res) => {
     const { clientInfo, invoiceInfo } = req.body[0]
     const products = req.body[1]
     const total = req.body[2]
     console.log(invoiceInfo)
     const newInvoice = new Invoice({
          invoiceInfo: invoiceInfo,
          products: products,
          total: {
               totalWithoutTaxes: total.totalWithoutTaxes,
               totalTaxes: total.totalTaxes,
               total: total.total
          }
     })

     //Adding the user's company info in the invoice
     newInvoice.companyInfo = req.user.id
     //Finding existing or creating new client logic
     const client = await Client.findOne({ name: clientInfo.name })
     if (client) {
          newInvoice.clientInfo = client
     } else {
          const newClient = new Client({
               name: clientInfo.name,
               address: clientInfo.address,
               tel: clientInfo.tel,
               email: clientInfo.email
          })
          newClient.save()
          newInvoice.clientInfo = newClient
     }
     await newInvoice.save()
     //Adding the invoice in the users's invoices
     const user = await User.findOne({ id: req.user.id })
     user.invoices.push(newInvoice)
     await user.save()
     ///
     console.log("POST REQUEST")
     res.json(newInvoice.id)
     // res.end()
})



//Edit route
router.patch("/invoice/:id", checkAuthenticated, checkVerification, async (req, res) => {
     const { clientInfo, invoiceInfo } = req.body[0]
     const products = req.body[1]
     const total = req.body[2]
     console.log("PATCH REQUEST")
     let editedInvoice = await Invoice.findByIdAndUpdate(req.params.id, {
          invoiceInfo: invoiceInfo,
          products: products,
          total: {
               totalWithoutTaxes: total.totalWithoutTaxes,
               totalTaxes: total.totalTaxes,
               total: total.total
          }
     })
     const client = await Client.findOne({ name: clientInfo.name })
     if (client) {
          editedInvoice.clientInfo = client
     } else {
          const newClient = new Client({
               name: clientInfo.name,
               address: clientInfo.address,
               tel: clientInfo.tel,
               email: clientInfo.email
          })

          newClient.save()
          editedInvoice.clientInfo = newClient
     }
     await editedInvoice.save()
     res.render("table")

})

//Payment confirm or not
router.post("/myinvoices/:id/payed", checkAuthenticated, checkVerification, async (req, res) => {
     await Invoice.findByIdAndUpdate(req.params.id, { payed: req.body.payed })
     res.render("myinvoices")
})

router.post("/myinvoices/:id/notpayed", checkAuthenticated, checkVerification, async (req, res) => {
     console.log(req.body.payed)
     const invoice = await Invoice.findByIdAndUpdate(req.params.id, { payed: req.body.payed })
     console.log(invoice)
     res.redirect("/myinvoices")
})

//Delete route
router.delete("/myinvoices/:id/delete", checkAuthenticated, checkVerification, async (req, res) => {
     const invoice = await Invoice.findByIdAndDelete(req.params.id)
     const user = await User.findById(invoice.companyInfo)
     await user.updateOne({ $pull: { invoices: { $in: invoice.id } } })
     res.end()
})

module.exports = router