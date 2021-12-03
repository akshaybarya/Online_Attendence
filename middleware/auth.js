module.exports = function (req, res, next) {
  // Get Token From Header
  const admin = req.header("x-admin-token");

  // check if not token
  if (!admin) {
    return res.status(401).json({ msg: "No Token , authorisation denied" });
  }
  // verify token
  try {
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
