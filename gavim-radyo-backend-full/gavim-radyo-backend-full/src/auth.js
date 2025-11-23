const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = [];

(async () => {
  const hash = await bcrypt.hash('123456', 10);
  users.push({ username: 'admin', password: hash });
  console.log('Default user created: admin / 123456');
})();

exports.login = async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'username ve password gerekli' });

  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: 'Kullanıcı bulunamadı' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Şifre yanlış' });

  const token = jwt.sign({ username }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
  res.json({ token });
};

exports.verifyToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'Token yok' });
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Token geçersiz' });
  }
};
