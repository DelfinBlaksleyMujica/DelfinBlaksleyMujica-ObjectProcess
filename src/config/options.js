const dotenv = require("dotenv").config();


const options = {
    mongoDB: {
        url:process.env.MONGO_URL
    },
}

module.exports = { options }