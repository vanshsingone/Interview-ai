const momgooose = require("mongoose")

async function connectTODB() {
    await mongoose.connect(process.env.MONGO_URI)

    try{
        console.log("Connected to database")
    } catch (error) {
        console.error("Error connecting to database:", error)
    }
}

module.exports = connectTODB