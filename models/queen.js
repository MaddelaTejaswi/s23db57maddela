const mongoose = require("mongoose")
const queenSchema = mongoose.Schema({
Queen_age: String,
Queen_height: Number,
Queen_name:String
})
module.exports = mongoose.model("queen",
queenSchema)