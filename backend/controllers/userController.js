const User = require("../models/user_model");
const jwt = require("jsonwebtoken");


// Create a new user
const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName) {
            return res.status(400).json({ error: true, message: "Full Name is required" });
        }

        if (!email) {
            return res.status(400).json({ error: true, message: "Email is required" });
        }

        if (!password) {
            return res.status(400).json({ error: true, message: "Password is required" });
        }

        const isUser = await User.findOne({ email: email });

        if (isUser) {
            return res.status(400).json({ error: true, message: "User already exists" });
        }

        const user = new User({
            fullName,
            email,
            password,
        });

        await user.save();

        const accessToken = jwt.sign({
            user
        },
            process.env.TOKEN_SECRET, {
            expiresIn: "36000m",
        });

        return res.json({
            error: false,
            user,
            accessToken,
            message: "Registration Successful"
        });


    } catch (error) {
        return res.json({
            status: false,
            message: "Error in Create Account API.",
        })
    }
}


// Signin user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ error: true, message: "Email is required" });
        }

        if (!password) {
            return res.status(400).json({ error: true, message: "Password is required" });
        }

        const userInfo = await User.findOne({ email: email });

        if (!userInfo) {
            return res.status(400).json({ error: true, message: "User not found" });
        }

        if (userInfo.email == email && userInfo.password == password) {
            const user = { user: userInfo };
            const accessToken = jwt.sign(user, process.env.TOKEN_SECRET, {
                expiresIn: "36000m",
            });

            return res.json({
                error: false,
                message: "Login Successful",
                email,
                accessToken,
            });
        } else {
            return res.status(400).json({
                error: true,
                message: "Invalid Credentials",
            });
        }
    } catch (error) {
        return res.json({
            status: false,
            message: "Error in Login API.",
        })
    }
}


// Get user data
const userData = async (req, res) => {
    try {

        const { user } = req.user;

        const isUser = await User.findOne({ _id: user._id });

        if (!isUser) {
            return res.sendStatus(401);
        }

        return res.json({
            user: {
                fullName: isUser.fullName,
                email: isUser.email,
                _id: isUser._id,
                createdOn: isUser.createdOn,
            },
            message: "",
        });

    } catch (error) {
        return res.json({
            status: false,
            message: "Error in Get User API.",
        })
    }
}


module.exports = {
    register,
    login,
    userData,
}