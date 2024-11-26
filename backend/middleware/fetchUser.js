var jwt = require("jsonwebtoken");

//Token Signature
const JWT_SECRET = "firsttimeinnode2024";

const fetchuser = (req, res, next) => {
  //Get the user from the JWT token add ID to req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authienticate with a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authienticate with a valid token" });
  }
};

module.exports = fetchuser;
