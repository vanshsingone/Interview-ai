const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
let frontendUrl = process.env.FRONTEND_URL;
if (frontendUrl) {
    // Remove any quotes and trim whitespace/control characters
    frontendUrl = frontendUrl.replace(/['"]/g, "").trim();
}

app.use(cors({
    origin: frontendUrl || "http://localhost:5173",
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



module.exports = app