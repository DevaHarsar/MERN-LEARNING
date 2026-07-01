const adminMiddleware = (req, res, next) => {
    console.log("Admin Middleware: Checking user role...");
    console.log("User:", req.user);
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Admins only." });
    }
};

export default adminMiddleware;