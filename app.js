const express = require("express")
const routes = require("./routes")
const ExpressError = require("./error")

app = express()
app.use(express.json())
app.use("/items", routes)

app.use((req, res, next) => {
    return new ExpressError("Page Not Found", 404)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    return res.json({
        error: {
            message: err.message,
            code: err.status
        }
    })
})

module.exports = app
