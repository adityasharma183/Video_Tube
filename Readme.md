# 📺 Video Tube Backend

This is the backend service for **Video Tube**, a YouTube-like video hosting platform built using Node.js, Express, MongoDB, and Mongoose. It provides APIs for user authentication, video management, likes/dislikes, comments, playlists, subscriptions, and more.

## 🚀 Features

- User authentication with JWT (access + refresh tokens)
- Secure password hashing with bcrypt
- Upload videos, thumbnails, and avatars using Multer and Cloudinary
- Like/dislike videos
- Post comments and replies
- Subscribe/unsubscribe to creators
- Manage user playlists
- Dashboard and analytics endpoints

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- Cloudinary
- Multer
- JWT & Bcrypt
- dotenv

## 📁 Project Structure

```
src/
├── controllers/     # Business logic
├── routes/          # Express routes
├── models/          # Mongoose schemas
├── middlewares/     # Authentication, error handling, multer
├── utils/           # Custom utilities
├── db/              # DB connection logic
├── app.js           # App config
└── index.js         # App entry point
```

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/video-tube-backend.git
cd video-tube-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root:

```
PORT=8000
MONGODB_URI=yourmongo_db_url
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=<your_access_token_secret>
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=<your_refresh_token_secret>
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Run the Server

```bash
# For development
npm run dev

# For production
npm start
```

Server will be running at: `http://localhost:8000`

## 📬 API Endpoints (Sample)

- `POST /api/v1/users/register` – Register a user
- `POST /api/v1/users/login` – Login
- `GET /api/v1/videos/:id` – Get video details
- `POST /api/v1/videos/upload` – Upload a new video
- `POST /api/v1/comments/:videoId` – Add comment to a video

> Full API documentation coming soon via Postman collection.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature-name`)
3. Commit your changes
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Made with 💻 by Udai Bhat**
