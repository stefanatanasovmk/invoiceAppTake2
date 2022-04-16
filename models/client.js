const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ClientSchema = new Schema({
     name: String,
     address: String,
     tel: String,
     email: String
})

module.exports = mongoose.model("Client", ClientSchema)