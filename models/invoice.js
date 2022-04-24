const mongoose = require("mongoose")
const Schema = mongoose.Schema
const User = require("./user")

const InvoiceSchema = new Schema({
     companyInfo: {
          type: Schema.Types.ObjectId,
          ref: "User"
     },
     clientInfo: {
          type: Schema.Types.ObjectId,
          ref: "Client"
     },
     invoiceInfo: {
          invoiceNumber: String,
          executionDate: Date,
          invoiceDate: Date,
          paymentDate: Date
     },
     products: {
          type: Array,
          trim: true
     },
     total: {
          totalWithoutTaxes: String,
          totalTaxes: String,
          total: String
     },
     payed: {
          type: Boolean,
          default: false
     }
})



module.exports = mongoose.model("Invoice", InvoiceSchema)