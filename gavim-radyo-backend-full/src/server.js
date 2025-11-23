const express = require('express');
const auth = require('./auth');
const drive = require('./drive');
const app = express();
app.use(express.json());

app.get('/', (req,res)=>res.json({status:"Gavim Radyo API OK"}));

app.post('/login', auth.login);
app.get('/songs', auth.verifyToken, drive.getSongs);

const PORT = process.env.PORT || 10000;
app.listen(PORT, ()=>console.log("Server running on "+PORT));
