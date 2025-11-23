const jwt = require("jsonwebtoken");

const USERS = [
  { username: "admin", password: "1234" }
];

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: "Unauthorized" });

  const token = jwt.sign({ username }, process.env.JWT_SECRET || "secret", {
    expiresIn: "1d",
  });

  res.json({ token });
};

exports.verifyToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.sendStatus(403);

  const token = header.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET || "secret", (err, data) => {
    if (err) return res.sendStatus(403);
    req.user = data;
    next();
  });
};
