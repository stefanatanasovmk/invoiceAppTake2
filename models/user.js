const { hash } = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose")

const UserSchema = new Schema({
     username: {
          type: String,
          required: true,
          unique: [true, 'That email address has already been used']
     },
     companyName: String,
     address: String,
     tel: String,
     bankAccount: String,
     taxNumber: String,
     invoices: [{
          type: Schema.Types.ObjectId,
          ref: "Invoice"
     }],
     verified: {
          type: Boolean,
          default: false
     },
     verificationCode: {
          type: String,
     },
     forgotenPassword: {
          code: String,
          date: {
               type: Date,
               default: Date.now
          }
     }

})
UserSchema.plugin(passportLocalMongoose)



module.exports = mongoose.model("User", UserSchema)


