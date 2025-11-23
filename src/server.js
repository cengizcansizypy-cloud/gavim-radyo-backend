const express = require("express");
const cors = require("cors");
const auth = require("./auth");
const drive = require("./drive");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/login", auth.login);
app.get("/songs", auth.verifyToken, drive.listSongs);

app.get("/", (req, res) => res.json({ status: "Gavim Radyo API OK" }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port", port));
