const bcrypt = require("bcrypt");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { userName, password } = req.body
    if (!userName || !password) {
        return res.status(400).json({ message: "please enter all fields", data: req.body })
    }
    let user = await User.findOne({ userName }).lean()
    if (!user) {
        user = await User.findOne({ email: userName }).lean()
        if (!user) {
            return res.status(400).json({ message: "unauthorized - user not found" })
        }
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(400).json({ message: "unauthorized - invalid password" })
    }

    const userInfo = {
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        id: user._id,
        forums: user.forums || []
    }
    const token = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({ message: "logged in successfully", accessToken: token, user: userInfo })
};


const register = async (req, res) => {

    const { firstName, lastName, email, password, userName } = req.body
    if (!firstName || !lastName || !email || !password || !userName) {
        return res.status(400).json({ message: "please enter all fields" })
    }
    const duplicateEmail = await User.findOne({ email }).lean()
    if (duplicateEmail) {
        return res.status(400).json({ message: "email already exists" })
    }
    const duplicateUserName = await User.findOne({ userName }).lean()
    if (duplicateUserName) {
        return res.status(400).json({ message: "userName already exists" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)


    try {

        const newUser = new User({ firstName, lastName, email, password: hashedPassword, userName })
        const avatarName = newUser.userName.split(' ').join('+')
        newUser.avatar = `https://ui-avatars.com/api/?name=${avatarName}&length=1&rounded=true&bold=true&background=random`
        const user = await newUser.save()
        const userInfo = { user, password: undefined }

        res.status(201).json(userInfo)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
}

module.exports = { login, register };
