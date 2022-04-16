const express = require("express")
const router = express.Router()
const checkVerification = require("../utility/checkVerification")
const checkAuthenticated = require("../utility/isLoggedIn")
const Invoice = require("../models/invoice");
const User = require("../models/user")
const Client = require("../models/client");
const passport = require("passport")

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_EMAIL_API_KEY);
const randomstring = require("randomstring")

//loginSingupPage
router.get("/loginsignup", (req, res) => {
     res.render("loginSignup")
})
//Registration
router.post("/signup", async (req, res) => {
     const verificationCode = randomstring.generate({ length: 6, charset: "alphabetic", capitalization: "uppercase" })
     const { email, password, companyName, companyAddress, companyPhone, companyBankAccount, companyTaxNumber } = req.body
     const user = new User({ username: email })
     await User.register(user, password)
     user.companyName = companyName
     user.address = companyAddress
     user.bankAccount = companyBankAccount
     user.taxNumber = companyTaxNumber
     user.tel = companyPhone
     user.verificationCode = verificationCode
     user.save()

     const msg = {
          to: email,
          from: 'atanasovstefan@hotmail.com', // Use the email address or domain you verified above
          subject: 'Код за потврда',
          text: `Кодот за потврда на вашата е-маил адреса е: ${verificationCode}`,
          // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
     };
     try {
          await sgMail.send(msg)
     } catch (e) {
          console.log("email wasn't sent")
          console.log(e)
     }
     // , companyName: companyName, address: companyAddress, bankAccount: companyBankAccount, taxNumber: companyTaxtNumber, tel: companyPhone
     res.redirect("/")
})
//Login
router.post("/login", passport.authenticate("local", { failureRedirect: "/loginsignup" }), checkVerification, async (req, res) => {
     res.redirect("/")
})

//LogOut
router.post("/logout", checkAuthenticated, checkVerification, async (req, res) => {
     req.logout()
     res.redirect("/loginsignup")
})

module.exports = router