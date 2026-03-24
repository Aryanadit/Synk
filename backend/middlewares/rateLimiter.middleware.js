import rateLimit from "express-rate-limit"

export const globalLimiter = rateLimit({
    windowMs : 15 *60 * 1000 , 
    max : 100 , 
    message : {
        success : false , 
        message : "Too many requests, try again later"
    }
}) ; 

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    skipSuccessfulRequests: true, // only count failed logins
    message: {
        success: false,
        message: "Too many failed login attempts",
    },
});

