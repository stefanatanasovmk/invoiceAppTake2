const express = require("express")
const router = express.Router()
const checkVerification = require("../utility/checkVerification")
const checkAuthenticated = require("../utility/isLoggedIn")
const User = require("../models/user")
const bcrypt = require('bcrypt');


const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_EMAIL_API_KEY);
const randomstring = require("randomstring")

//Change password from the user's profile page
router.post("/myprofile/changepass", checkAuthenticated, checkVerification, async (req, res) => {
     const { oldPassword, newPassword1, newPassword2 } = req.body
     const user = await User.findById(req.user.id)
     if (user) {
          if (newPassword1 === newPassword2) {
               try {
                    await user.changePassword(oldPassword, newPassword1)
               } catch (e) {
                    console.log(e)
                    console.log("password ain't changed")
               }
          } else {
               console.log("old and new password doesnt match")
          }
     } else {
          console.log("no user")
     }
     console.log(req.body)
     res.redirect("/myprofile")
})


//Forgoten password
router.get("/forgotpassword", (req, res) => {
     res.render("forgotpassword")
})
router.post("/forgotpassword", async (req, res) => {
     const user = await User.findOne({ username: req.body.email })
     const today = Date.now()
     if (user) {
          const randomString = randomstring.generate({ length: 20, charset: "hex" })
          const code = await bcrypt.hash(randomString, 12)
          user.forgotenPassword.code = code
          user.forgotenPassword.date = today
          await user.save()
          const msg = {
               to: user.username,
               from: 'atanasovstefan@hotmail.com', // Use the email address or domain you verified above
               subject: 'Промена на лозинка',
               text: `За да ја променете вашата лозинка кликнете на следниов линк: http://localhost:3000/forgotpassword/${randomString}`
          };
          try {
               await sgMail.send(msg)
          } catch (e) {
               console.log("email wasn't sent")
               console.log(e)
          }
     }

     res.redirect("/loginsignup")
})
//Changing of forgoten password
router.get("/forgotpassword/:id", async (req, res) => {
     const id = req.params.id
     res.render("changepass", { id })
})
router.post("/forgotpassword/:id", async (req, res) => {
     const { email, newPassword1, newPassword2 } = req.body
     const user = await User.findOne({ username: email })
     const now = Date.now()
     if (user) {
          if (!(now > (Date.parse(user.forgotenPassword.date.toString()) + 10800000))) {
               console.log("your link is on time")
               const authorization = await bcrypt.compare(req.params.id, user.forgotenPassword.code)
               if (authorization) {
                    if (newPassword1 === newPassword2) {
                         console.log("true")
                         await user.setPassword(newPassword2)
                         user.forgotenPassword.code = ""
                         await user.save()
                    }
               } else {
                    console.log("not authorizated")
               }
          } else {
               console.log("Your link is late")
          }
          res.redirect("/")
     } else {
          res.redirect("/loginsignup")
     }

})

module.exports = router