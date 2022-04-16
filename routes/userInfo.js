const express = require("express")
const router = express.Router()
const checkVerification = require("../utility/checkVerification")
const checkAuthenticated = require("../utility/isLoggedIn")
const User = require("../models/user")
const randomstring = require("randomstring")

//Mail & randomString 
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_EMAIL_API_KEY);

//User setings route
router.get("/myprofile", checkAuthenticated, checkVerification, (req, res) => {
     const user = req.user
     res.render("myprofile", { user })
})
//Change user info
router.post("/myprofile/changeuserinfo", checkAuthenticated, checkVerification, async (req, res) => {
     const newUsername = req.body.username
     const newInfo = req.body
     const user = await User.findByIdAndUpdate(req.user.id, newInfo)
     if (req.user.username !== newUsername) {
          const newVerificationCode = randomstring.generate({ length: 6, charset: "alphabetic", capitalization: "uppercase" })
          user.verified = false
          user.verificationCode = newVerificationCode
          user.save()
          const msg = {
               to: newUsername,
               from: 'atanasovstefan@hotmail.com',
               subject: 'Код за потврда',
               text: `Кодот за потврда на вашата нова е-маил адреса е: ${newVerificationCode}`,
          };
          try {
               await sgMail.send(msg)
          } catch (e) {
               console.log("email wasn't sent")
               console.log(e)
          }
     }
     res.redirect("/")
})
//Verify
router.get("/verify", checkAuthenticated, async (req, res) => {
     res.render("verify")
})
router.post("/verifycode", checkAuthenticated, async (req, res, next) => {
     console.log(req.body.code)
     console.log(req.user.verificationCode)
     const user = await User.findById(req.user.id)
     if (req.body.code === user.verificationCode) {
          user.verified = true
          await user.save()
     }
     res.redirect("/")

})
//Send verification code again
router.get("/sendverificationcode", checkAuthenticated, async (req, res) => {
     console.log(req.user.id)
     const msg = {
          to: req.user.username,
          from: 'atanasovstefan@hotmail.com', // Use the email address or domain you verified above
          subject: 'Код за потврда',
          text: `Кодот за потврда на вашата е-маил адреса е: ${req.user.verificationCode}`,
     };
     try {
          await sgMail.send(msg)
     } catch (e) {
          console.log("email wasn't sent")
          console.log(e)
     }
     res.render("verify")
})


module.exports = router