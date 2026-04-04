Onlystans - Music Artists Fan Club Platform

A full-stack web application for music artist fan clubs, built with Node.js, React.js, and MongoDB.

## Project Overview

Onlystans allows users to browse and join fan clubs, create and manage posts within them, and interact with other fans through likes and comments.

## Tech Stack

- **Frontend:** React.js, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** AWS EC2
- **CI/CD:** GitHub Actions

## Project Setup Instructions

### Prerequisites
- Node.js v18+
- npm
- MongoDB Atlas account
- Git

### 1. Clone the repository
```bash
git clone https://github.com/Sivapriya012/Onlystans.git
cd Onlystans
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Configure environment variables
Create a `.env` file in the `backend/` folder:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5001

### 4. Run the application
```bash
# From root folder - runs both frontend and backend
npm start
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5001

##  Public URL

http://3.107.188.185:3000

##  Test Credentials

| Role | Email | Password |
|------|-------|----------|
| User | test@test.com | test1234 |

##  Project Structure
Onlystans/
├── backend/
│   ├── config/         # Database configuration
│   ├── controllers/    # Route handlers
│   ├── middleware/     # JWT authentication
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API routes
│   └── server.js       # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # Auth context
│   │   ├── pages/      # Application pages
│   │   └── App.js      # Root component
└── .github/
└── workflows/
└── ci.yml      # CI/CD pipeline

##  API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |

### Fan Clubs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/fanclubs | Get all fan clubs |
| POST | /api/fanclubs | Create fan club |
| PUT | /api/fanclubs/:id | Update fan club |
| DELETE | /api/fanclubs/:id | Delete fan club |

### Posts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/posts/fanclub/:id | Get posts by fan club |
| POST | /api/posts | Create post |
| PUT | /api/posts/:id | Update post |
| DELETE | /api/posts/:id | Delete post |

### Comments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/comments/post/:id | Get comments by post |
| POST | /api/comments | Create comment |
| PUT | /api/comments/:id | Update comment |
| DELETE | /api/comments/:id | Delete comment |

##  CI/CD Pipeline

GitHub Actions automatically:
1. Installs backend dependencies
2. Installs frontend dependencies
3. Builds the frontend
4. Deploys to AWS EC2 on push to main

##  Developer

**Sivapriya Punnasseril**
Student ID: N12258041
QUT - IFN636