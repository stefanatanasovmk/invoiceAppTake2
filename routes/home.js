
const express = require("express")
const router = express.Router()

const checkVerification = require("../utility/checkVerification")
const checkAuthenticated = require("../utility/isLoggedIn")
//Landing page in the future

router.get("/", checkAuthenticated, checkVerification, async (req, res) => {
     res.render("table")
})

module.exports = router