import jwt from 'jsonwebtoken';

const COOKIE_NAME = 'token';
const TOKEN_LIFETIME_SECONDS = 7 * 24 * 60 * 60;

function cookieOptions() {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.COOKIE_SAME_SITE || 'lax',
        path: '/'
    };
}

export function createToken(user) {
    return jwt.sign(
        { id: user._id.toString() },
        process.env.JWT_SECRET,
        { expiresIn: TOKEN_LIFETIME_SECONDS, algorithm: 'HS256' }
    );
}

export function setAuthCookie(res, token) {
    res.cookie(COOKIE_NAME, token, {
        ...cookieOptions(),
        maxAge: TOKEN_LIFETIME_SECONDS * 1000
    });
}

export function clearAuthCookie(res) {
    res.clearCookie(COOKIE_NAME, cookieOptions());
}

export function publicUser(user) {
    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email
    };
}
