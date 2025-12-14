import jwt from'jsonwebtoken';
import User from './../model/userModel.js';
import bcryptjs from 'bcryptjs';

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

// SIGNUP
export const signup = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        const user = await User.create({
            username,
            email,
            password,
            confirmPassword
        });

        const token = signToken(user._id);

        res.status(201).json({
            status: 'success',
            token,
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide your email and password'
            });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await bcryptjs.compare(password, user.password))) {
            return res.status(401).json({
                status: 'fail',
                message: 'Incorrect email or password'
            });
        }

        const token = signToken(user._id);

        res.status(200).json({
            status: 'success',
            token
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
        console.log(err.message)
    }
};

// PROTECT
export const protect = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization && req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'You are not logged in! Please login to get access'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const freshUser = await User.findById(decoded.id);
        if (!freshUser) {
            return res.status(401).json({
                status: 'fail',
                message: 'The user belonging to this token no longer exists'
            });
        }

        req.user = freshUser; 
        next();
    } catch (err) {
        res.status(401).json({
            status: 'fail',
            message: 'Invalid token'
        });
    }
};
