const checkVerified = (req, res, next) => {
     if (req.user.verified) {
          return next()
     }
     res.redirect("/verify")
}

module.exports = checkVerified