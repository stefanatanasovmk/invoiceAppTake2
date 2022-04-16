const checkAuthenticated = (req, res, next) => {
     if (req.isAuthenticated()) {
          return next()
     }
     res.redirect("/loginsignup")
}

module.exports = checkAuthenticated

