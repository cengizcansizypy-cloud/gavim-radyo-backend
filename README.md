# Gavim Radyo Backend (Full)

Bu proje, kullanıcı adı/şifre ile giriş yapan ve Google Drive'daki müzikleri listeleyen basit bir backend sağlar.

## Ortam Değişkenleri (Render / .env)
JWT_SECRET=bir_gizli_deger
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REFRESH_TOKEN=...
GOOGLE_DRIVE_FOLDER_ID=...

## Çalıştırma (lokalde)
1. `.env` dosyası oluştur ve değişkenleri koy.
2. `npm install`
3. `npm start`

## API
- POST /login
  - body: { "username": "admin", "password": "123456" }
  - döner: { token: "..." }
- GET /songs
  - header: Authorization: Bearer <token>
  - döner: { songs: [ { id, name, url } ] }

Not: Render üzerinde deploy ederken Environment Variables kısmına yukarıdaki değişkenleri eklemeyi unutma.
