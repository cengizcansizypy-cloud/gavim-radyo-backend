const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req,res)=> {
  res.json({status: 'Gavim Radyo API OK'});
});

app.post('/login',(req,res)=>{
  const {username, password} = req.body;
  if(username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS){
    return res.json({message:'Login OK'});
  }
  res.status(401).json({message:'Unauthorized'});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('Server running on '+PORT));
