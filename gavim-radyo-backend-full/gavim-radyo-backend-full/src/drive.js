const { google } = require('googleapis');

function getDriveClient() {
  const auth = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return google.drive({ version: 'v3', auth });
}

exports.listSongs = async (req, res) => {
  try {
    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    if (!folderId) return res.status(400).json({ error: 'GOOGLE_DRIVE_FOLDER_ID ayarlı değil' });

    const drive = getDriveClient();
    const resp = await drive.files.list({
      q: `'${folderId}' in parents and (mimeType contains 'audio/' or mimeType='audio/mpeg')`,
      fields: 'files(id, name, mimeType)'
    });

    const songs = (resp.data.files || []).map(f => ({
      id: f.id,
      name: f.name,
      url: `https://www.googleapis.com/drive/v3/files/${f.id}?alt=media`
    }));

    res.json({ songs });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Drive API hatası', detail: e.message });
  }
};
