import { Schema, model, Document } from 'mongoose';
import jwt from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';
import { ModifiedUserValidatorType, UserValidatorType } from '../../../validators/user';

const userSchema: Schema<UserValidatorType> = new Schema({
    username: {
        type: String,
        lowercase: true,
        index: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'user_service'],
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String
    },
    assessToken: {
        type: String
    }

}, { timestamps: true });

userSchema.pre<ModifiedUserValidatorType>('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
    return await compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY as string
        }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET as string,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY as string
        }
    );
};

const User = model<UserValidatorType>('User', userSchema);

export default User;