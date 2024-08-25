export const allowAdmin = (req, res, next) => {
  if (req.user.role.toLowerCase() !== "admin") {
    return res.status(403).json({ error: "Forbidden! Only Admins Allowed" });
  } else {
    next();
  }
};
