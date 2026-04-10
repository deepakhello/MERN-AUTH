const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({

    username: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        token: String,
        expires: Date
    },
    OTP_VerficationToken: {
        OTP: String,
        expires: Date
    }

})

const UserModel = mongoose.model('Users', UserSchema)

module.exports = UserModel