const mongoose = require('mongoose')

const connectDb = async (url) => {
	mongoose.connect(url).then(()=>console.log("Connected to DB"))
}

module.exports = { connectDb };