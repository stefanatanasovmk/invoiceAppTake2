const express = require("express")
const router = express.Router()
const Invoice = require("../models/invoice")
const checkVerification = require("../utility/checkVerification")
const checkAuthenticated = require("../utility/isLoggedIn")

//API response
router.get("/invoice/:id", checkAuthenticated, checkVerification, async (req, res) => {
     const invoice = await Invoice.findById(req.params.id).populate("clientInfo")
     res.json(invoice)
})
router.get("/userInfo", checkAuthenticated, checkVerification, async (req, res) => {
     res.json(req.user)
})
router.get("/getInvoices", checkAuthenticated, checkVerification, async (req, res) => {
     const products = await Invoice.find({ companyInfo: req.user.id }).populate("clientInfo")
     res.json(products)
})

module.exports = router