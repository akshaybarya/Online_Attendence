const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Get Token From Header
  const token = req.header("x-auth-token");

  // check if not token
  if (!token) {
    return res.status(401).json({ msg: "No Token , authorisation denied" });
  }
  // verify token
  try {
    const decoaded = jwt.verify(token, config.get("jwtSecret"));

    if (
      decoaded &&
      req.body.id &&
      decoaded.user &&
      (decoaded.user.id === req.body.id ||
        decoaded.user.id === config.get("admin"))
    ) {
      next();
    } else res.status(401).json({ msg: "You Dont Have Permission To View" });
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
