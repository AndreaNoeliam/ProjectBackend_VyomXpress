# VyomXpress Backend API & Discord Bot

This project is a comprehensive backend solution built with Node.js that integrates a structured RESTful API with an interactive Discord Bot. It leverages Sequelize as the ORM to manage a cloud-hosted MySQL database on Aiven.

## 🛠️ Technologies Used

- **Runtime Environment:** Node.js (v24.14.0)
- **Web Framework:** Express.js
- **ORM:** Sequelize
- **Database:** MySQL (Hosted on Aiven Cloud)
- **Integration:** Discord.js (v14)
- **Authentication:** JSON Web Tokens (JWT) & Bcrypt (Password Hashing)
- **Security:** express-rate-limit (Rate Limiting)

## 📁 Project Structure

```plaintext
BackendProject_VyomXpress/
├── src/
│   ├── bot/
│   │   ├── deploy-commands.js   # Slash Commands registration script
│   │   └── index.js             # Discord Bot initialization and command logic
│   ├── config/
│   │   └── db.js                # Sequelize database connection setup
│   ├── controllers/
│   │   └── auth.controller.js   # Authentication logic (signup, login & me)
│   ├── middlewares/
│   │   ├── auth.middleware.js   # JWT token verification middleware
│   │   ├── error.middleware.js  # Global centralized error handler
│   │   └── rateLimit.middleware.js  # Rate limiting for auth routes
│   ├── models/
│   │   ├── index.js             # Model unifier and database synchronizer
│   │   ├── service.model.js     # Service table schema definition
│   │   └── user.model.js        # User table schema definition
│   ├── routes/
│   │   └── auth.router.js       # Express authentication routes
│   └── app.js                   # Application main entry point
├── .env                         # Environment variables (Ignored by Git)
├── .gitignore                   # Files and folders excluded from Git
├── package.json                 # Project dependencies and npm scripts
└── README.md                    # Project documentation
```

## ⚙️ Environment Configuration

To run this project locally, create a `.env` file in the root directory with the following structure:

```env
PORT=3000

# Database Configuration (Aiven/MySQL)
DB_HOST=your_aiven_host_here
DB_USER=avnadmin
DB_PASSWORD=your_aiven_password_here
DB_NAME=defaultdb
DB_PORT=your_aiven_port_here

# JWT Configuration
JWT_SECRET=your_super_secret_key_phrase

# Discord Configuration
DISCORD_CLIENT_ID=your_discord_client_id_here
DISCORD_TOKEN=your_discord_bot_token_here
```

## 🚀 Installation & Setup

1. Clone the repository to your local machine.

2. Install all required dependencies:
```bash
npm install
```

3. Start the application server and launch the Discord bot:
```bash
node src/app.js
```

Upon initialization, the console will log database connection confirmation, schema synchronization status, slash command deployment updates, and successful Discord bot authentication.

## 🛣️ REST API Endpoints

Base URL (production): `https://vyomxpress-backend-xjbx.onrender.com`

### Authentication (`/api/v1/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/signup` | Registers a new user. Validates duplicate usernames, enforces minimum length (username ≥ 3 chars, password ≥ 8 chars), hashes password with bcrypt and returns a signed JWT token. | No |
| POST | `/login` | Verifies credentials and issues a 24-hour JWT token upon successful authentication. | No |
| GET | `/me` | Returns the authenticated user's profile (id, username, createdAt). | Yes |

### Authentication Header (for protected routes)