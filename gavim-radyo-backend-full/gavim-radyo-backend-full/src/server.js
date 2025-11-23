const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const auth = require('./auth');
const drive = require('./drive');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/login', auth.login);
app.get('/songs', auth.verifyToken, drive.listSongs);

app.get('/', (req, res) => res.send('Gavim Radyo API çalışıyor.'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Gavim Radyo backend listening on port', PORT);
});
