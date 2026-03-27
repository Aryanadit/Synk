export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    // Only log server errors
    if (statusCode >= 500) {
        console.error("🔥 Server Error:", err);
    }

    res.status(statusCode).json({
        success: false,
        message: err.message || "Something went wrong",
    });
};