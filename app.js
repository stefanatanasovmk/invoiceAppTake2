const express = require("express")
const app = express()
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const path = require("path");
const session = require("express-session")
const User = require("./models/user")

const passport = require("passport")
const LocalStrategy = require("passport-local")
const ejsMate = require("ejs-mate")
require("dotenv").config()


//Send mail
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_EMAIL_API_KEY);

app.engine("ejs", ejsMate)
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static("public"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Session config
const sessionConfg = {
     secret: "secret",
     resave: false,
     saveUninitialized: false,
     cookie: {
          httpOnly: true,
          expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
          maxAge: 1000 * 60 * 60 * 24 * 7
     }
}
app.use(session(sessionConfg))
//Passport middlewares
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//Routes
const home = require("./routes/home")
app.use("/", home)
const invoicesRoutes = require("./routes/invoices")
app.use("/", invoicesRoutes)
const userInfoRoutes = require("./routes/userInfo")
app.use("/", userInfoRoutes)
const userPasswordRoutes = require("./routes/userPassword")
app.use("/", userPasswordRoutes)
const loginSignup = require("./routes/loginSignup")
app.use("/", loginSignup)
const api = require("./routes/api")
app.use("/api", api)

//Schedule to sent mail for unpayed invoices every 24h

const sendEmailRemainderLateInvoices = require("./utility/sendUnpayedInvoiceReminder")
const cron = require('cronitor')('process.env.CRONITOR_API_KEY');
cron.wraps(require('node-cron'));
cron.schedule('sendEmailRemainderLateInvoices', '0 */24 * * *', function () {
     sendEmailRemainderLateInvoices()
     console.log('Sending welcome email to new sign ups every twenty minutes.');
});

//SERVERS 
app.listen(3000, () => {
     console.log("Express works")
})

mongoose.connect('mongodb://localhost:27017/invoice');
try {
     console.log("mongoose works")
} catch (e) {
     console.log("Mongoose dont work", e)
}



