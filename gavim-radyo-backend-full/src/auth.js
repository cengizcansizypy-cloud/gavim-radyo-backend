const jwt = require('jsonwebtoken');

exports.login = (req,res)=>{
  const {username,password} = req.body;
  if(username==="admin" && password==="123456"){
    const token = jwt.sign({user:"admin"}, process.env.JWT_SECRET || "secret", {expiresIn:"1d"});
    return res.json({token});
  }
  res.status(401).json({error:"Invalid credentials"});
};

exports.verifyToken = (req,res,next)=>{
  const h = req.headers['authorization'];
  if(!h) return res.status(403).json({error:"No token"});
  const token = h.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET || "secret", (err,decoded)=>{
    if(err) return res.status(403).json({error:"Invalid token"});
    req.user=decoded;
    next();
  });
};
