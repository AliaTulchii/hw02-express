const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers")

const emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

const userSchema = new Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Set password for user'],
        minlength: 7,
    },
    email: {
        type: String,
        match: emailRegexp,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: "",
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
}, { versionKey: false, timestamps: true })

userSchema.post("save", handleMongooseError)

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(7).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(7).required(),
})


const schemas = {
    registerSchema,
    loginSchema,
}

const User = model("user", userSchema)


module.exports = {
    User,
    schemas,
}

