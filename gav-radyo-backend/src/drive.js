const { google } = require("googleapis");

function getDriveClient() {
  const client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  });
  return google.drive({ version: "v3", auth: client });
}

exports.listSongs = async (req, res) => {
  try {
    const drive = getDriveClient();
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

    const result = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'audio/'`,
      fields: "files(id, name, mimeType)"
    });

    res.json(result.data.files);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
};
