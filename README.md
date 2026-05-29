VyomXpress Backend API & Discord Bot 
This project is a comprehensive backend solution built with Node.js that integrates a structured RESTful API with an interactive Discord Bot. It leverages Sequelize as the ORM to manage a cloud-hosted MySQL database on Aiven.

🛠️ Technologies Used
Runtime Environment: Node.js (v24.14.0)

Web Framework: Express.js

ORM: Sequelize

Database: MySQL (Hosted on Aiven Cloud)

Integration: Discord.js (v14)

Authentication: JSON Web Tokens (JWT) & Bcrypt (Password Hashing)

📁 Project Structure
Plaintext
BackendProject_VyomXpress/
├── src/
│   ├── bot/
│   │   ├── deploy-commands.js   # Slash Commands registration script
│   │   └── index.js             # Discord Bot initialization and command logic
│   ├── config/
│   │   └── db.js                # Sequelize database connection setup
│   ├── controllers/
│   │   └── auth.controller.js   # Authentication logic (signup & login)
│   ├── middlewares/
│   │   └── error.middleware.js  # Global centralized error handler
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

⚙️ Environment Configuration
To run this project locally, you must create a .env file in the root directory with the following structure (replace placeholder values with actual credentials):

Code fragment
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
🚀 Installation & Setup
Clone the repository to your local machine.

Install all required dependencies:

Bash
npm install
Start the application server and launch the Discord bot:

Bash
node src/app.js
Upon initialization, the console will log database connection confirmation, schema synchronization status, application slash command deployment updates, and successful Discord bot authentication.

🛣️ REST API Endpoints
Authentication (/api/v1/auth)
POST /signup: Registers a new user. It checks for username duplicates in the database and automatically hashes passwords using a Sequelize hook before persistence. Returns a signed JWT token.

POST /login: Verifies provided user credentials against database records and issues a valid 24-hour JWT token upon successful authentication.

GET /me: Returns the authenticated user's profile. Requires Authorization: Bearer <token> header.


🤖 Discord Bot Interaction (Slash Commands)
/ppcreateuser [username] [password]: Creates and stores a new user record in the MySQL cloud database directly from Discord.

/ppcreateservice [name] [description]: Inserts a new service record into the cloud database.

/ppgetuser [username]: Searches for an existing user in the database and returns public account information.

🔗 Bot Invitation Link
To invite this bot to your own Discord server for testing, use the following authorization link:
[Click here to invite VyomXpress-Bot](https://discord.com/oauth2/authorize?client_id=1509938383928168448&permissions=8&integration_type=0&scope=bot+applications.commands)