import mongoose from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'A username must be provided']
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: 'Invalid email !'
        },
        required: [true, 'An email must be provided']
    },
    password: {
        type: String,
        required: [true, 'A password must be provided'],
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password']
    }
});

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return next();

    this.password = await bcryptjs.hash(this.password, 12);
    this.confirmPassword = undefined;
});

userSchema.methods.correctPassword = async function(candidate, hashed) {
    return await bcryptjs.compare(candidate, hashed);
}

const User = mongoose.model('User', userSchema);

export default User;