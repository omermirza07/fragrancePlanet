
 FragrancePlanet

 Table of Contents
1. [Project Overview](project-overview)
2. [Features](features)
3. [Technologies Used](technologies-used)
4. [System Architecture](system-architecture)
5. [Database Schema](database-schema)
6. [Setup and Installation](setup-and-installation)
7. [API Endpoints](api-endpoints)
8. [Debugging](debugging)
9. [Dependencies and Libraries](dependencies-and-libraries)
10. [Acknowledgments](acknowledgments)

---

 Project Overview

FragrancePlanet is a web application that helps users discover personalized cologne recommendations based on their favorite fragrances. The project uses AI to generate suggestions and allows users to browse colognes, add favorites, and manage their preferences.

 Key Functionalities
- User Authentication: Login and signup functionality using JWT.
- Browse Colognes: View a catalog of colognes and detailed descriptions.
- Favorite Management: Add or remove colognes from your favorites list.
- AI Recommendations: Receive personalized cologne recommendations based on your favorite notes.
- Admin Features: Add new colognes to the catalog.

---

 Features

1. User Registration and Login  
   - Secure authentication using JWT.
   - Passwords hashed using Bcrypt.

2. Browse Colognes  
   - View colognes with details like name, brand, description, and price.

3. Favorites Management  
   - Add or remove colognes from your favorites list.
   - View your favorite colognes.

4. Personalized Recommendations  
   - AI-generated cologne recommendations based on your favorite notes.


---

 Technologies Used

 Backend
- Node.js and Express.js
- MySQL (Database)
- JWT (jsonwebtoken) for authentication
- Bcrypt for password hashing
- Multer for image uploads
- Axios for API calls
- Dotenv for environment variable management
- Cors for cross-origin requests

 Frontend
- React (with hooks)
- React Router for navigation
- Axios for API calls
- Material-UI (MUI) for UI components
- Formik & Yup for form validation
- Styled Components for styling
- JWT Decode for decoding tokens

 AI Integration
- OpenAI API for generating personalized fragrance recommendations.

---

 System Architecture

```
fragrance-planet/
│
├── fragrance-planet-backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   │
│   ├── models/
│   │   ├── Cologne.js
│   │   ├── Review.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── cologneRoutes.js
│   │   ├── favoritesRoutes.js
│   │   ├── recommendationRoutes.js
│   │   └── userRoutes.js
│   │
│   └── server.js
│
└── fragrance-planet-frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── styles/
    │
    └── public/
```

---

 Database Schema

 Tables
1. Users Table
   | Field       | Data Type     | Description                      |
   |-------------|---------------|----------------------------------|
   | id          | INT (PK)      | User's unique ID                 |
   | username    | VARCHAR(255)  | User's username                  |
   | email       | VARCHAR(255)  | User's email                     |
   | password    | VARCHAR(255)  | User's hashed password           |

2. Colognes Table
   | Field        | Data Type     | Description                      |
   |--------------|---------------|----------------------------------|
   | id           | INT (PK)      | Cologne's unique ID              |
   | name         | VARCHAR(255)  | Cologne's name                   |
   | brand        | VARCHAR(255)  | Cologne's brand                  |
   | description  | TEXT          | Cologne's description            |
   | price        | DECIMAL(10,2) | Price of the cologne             |
   | imagePath    | VARCHAR(255)  | Path to the cologne image        |

3. Favorites Table
   | Field        | Data Type     | Description                      |
   |--------------|---------------|----------------------------------|
   | id           | INT (PK)      | Favorite's unique ID             |
   | userId       | INT (FK)      | Reference to the user            |
   | cologneId    | INT (FK)      | Reference to the cologne         |

---

 Setup and Installation

 Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fragrance-planet.git
   cd fragrance-planet/fragrance-planet-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   PORT=5000
   DB_HOST=your-db-host
   DB_USER=your-db-user
   DB_PASSWORD=your-db-password
   DB_NAME=fragrancePlanet
   JWT_SECRET=your-secret-key
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

 Frontend

1. Navigate to the frontend directory:
   ```bash
   cd fragrance-planet-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React app:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app.

---

 Dependencies and Libraries

 Backend Dependencies
Install these libraries in the `fragrance-planet-backend` directory:

```bash
npm install express mysql2 dotenv bcrypt jsonwebtoken cors multer axios
```

 Frontend Dependencies
Install these libraries in the `fragrance-planet-frontend` directory:

```bash
npm install axios react-router-dom jwt-decode @mui/material @emotion/react @emotion/styled formik yup styled-components
```

---

 Debugging

 Common Issues and Fixes

1. Database Connection Issues  
   - Ensure the `.env` file contains the correct database credentials.
   - Verify MySQL is running.

2. JWT Authentication Errors  
   - Check if the token is being sent correctly in the `Authorization` header.

3. Frontend/Backend Communication  
   - Ensure the backend is running on `http://localhost:5000` and update Axios base URLs accordingly.

---

 Acknowledgments

- Team Members: Omer Mirza, Shanthan Gunthi, Rymon Amir-Hamzeh, Adan Butt
- Technologies: Node.js, React, MySQL, OpenAI API
- Tools: Visual Studio Code, GitHub, Postman

---
