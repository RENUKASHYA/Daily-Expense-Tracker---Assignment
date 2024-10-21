## Daily Expenses Sharing Application

This is a backend application for managing and sharing daily expenses between users. It supports splitting expenses equally, by exact amounts, or by percentage. The application also generates downloadable balance sheets.

### Features
- **User Management**: Create and retrieve users with name, email, and mobile.
- **Expense Management**: Add expenses, retrieve individual or all expenses, and split expenses by three methods:
  - **Equal Split**: Split expenses equally among participants.
  - **Exact Split**: Specify the exact amount each participant owes.
  - **Percentage Split**: Specify the percentage of the total amount each participant owes.
- **Balance Sheet**: Generate and download a balance sheet in CSV format.

### Tech Stack
- **Backend**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (using Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **File Generation**: CSV (using `json2csv`)

---

## Table of Contents
1. [Installation](#installation)
2. [Environment Variables](#environment-variables)
3. [API Endpoints](#api-endpoints)
4. [Balance Sheet](#balance-sheet)
5. [Project Structure](#project-structure)
6. [Testing](#testing)
7. [Contributing](#contributing)

---

## Installation

Follow the steps below to set up and run the backend application on your local machine.

### Prerequisites
- **Node.js** (v12 or later)
- **MongoDB** (running locally or via cloud, e.g., MongoDB Atlas)

### Steps

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd daily-expenses-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables** (see [Environment Variables](#environment-variables)).

4. **Start MongoDB** (if running locally):
   ```bash
   mongod
   ```

5. **Run the application**:
   ```bash
   npm start
   ```

The server will start on the port specified in the environment variables or default to `3000`.

---

## Environment Variables

Create a `.env` file in the project root and configure the following variables:

```
PORT=3000                         # Port for running the server
MONGODB_URI=mongodb://localhost:27017/expenses-app    # MongoDB connection string
JWT_SECRET=your_jwt_secret         # Secret for JWT token generation
```

---

## API Endpoints

### User Endpoints

1. **Create User**
   - **POST** `/api/users`
   - Request body:
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "mobile": "1234567890"
     }
     ```
   - Response:
     ```json
     {
       "_id": "60d9c4e5f9d1b020485a6204",
       "name": "John Doe",
       "email": "john@example.com",
       "mobile": "1234567890"
     }
     ```

2. **Get User Details**
   - **GET** `/api/users/:userId`
   - Response:
     ```json
     {
       "_id": "60d9c4e5f9d1b020485a6204",
       "name": "John Doe",
       "email": "john@example.com",
       "mobile": "1234567890"
     }
     ```

### Expense Endpoints

1. **Add Expense**
   - **POST** `/api/expenses`
   - Request body:
     ```json
     {
       "amount": 500,
       "description": "Dinner",
       "paidBy": "60d9c4e5f9d1b020485a6204",
       "participants": [
         "60d9c4e5f9d1b020485a6204",
         "60d9c4e5f9d1b020485a6205"
       ],
       "splitMethod": "equal"
     }
     ```
   - Response:
     ```json
     {
       "_id": "60d9c4e5f9d1b020485a6206",
       "amount": 500,
       "description": "Dinner",
       "paidBy": "60d9c4e5f9d1b020485a6204",
       "participants": [
         "60d9c4e5f9d1b020485a6204",
         "60d9c4e5f9d1b020485a6205"
       ],
       "splitMethod": "equal",
       "splitDetails": {
         "60d9c4e5f9d1b020485a6204": 250,
         "60d9c4e5f9d1b020485a6205": 250
       }
     }
     ```

2. **Get User's Expenses**
   - **GET** `/api/users/:userId/expenses`
   - Response:
     ```json
     [
       {
         "_id": "60d9c4e5f9d1b020485a6206",
         "amount": 500,
         "description": "Dinner",
         "paidBy": "60d9c4e5f9d1b020485a6204",
         "splitDetails": {
           "60d9c4e5f9d1b020485a6204": 250,
           "60d9c4e5f9d1b020485a6205": 250
         }
       }
     ]
     ```

3. **Get All Expenses**
   - **GET** `/api/expenses`
   - Response:
     ```json
     [
       {
         "_id": "60d9c4e5f9d1b020485a6206",
         "amount": 500,
         "description": "Dinner",
         "paidBy": {
           "_id": "60d9c4e5f9d1b020485a6204",
           "name": "John Doe"
         },
         "splitDetails": {
           "60d9c4e5f9d1b020485a6204": 250,
           "60d9c4e5f9d1b020485a6205": 250
         }
       }
     ]
     ```

4. **Download Balance Sheet**
   - **GET** `/api/expenses/balance-sheet/download?format=csv`
   - This will return a downloadable CSV file with expense details.

---

## Balance Sheet

The balance sheet is generated in CSV format, containing details such as:
- **Amount**
- **Description**
- **Paid By**
- **Participants**
- **Split Method** (Equal, Exact, Percentage)
- **Split Details** (how much each participant owes)

---

## Project Structure

```
/daily-expenses-app
|-- /controllers      # Request handling logic
|-- /models           # MongoDB schemas for User and Expense
|-- /routes           # API routes
|-- /middlewares      # Authentication middleware (JWT)
|-- /utils            # Utility for CSV generation
|-- /tests            # Tests for the application
|-- app.js            # Main Express.js app file
|-- config.js         # Configuration file (DB, etc.)
|-- package.json      # Dependencies and scripts
|-- .env              # Environment variables
```

---

## Testing

Testing is optional but can be included using **Jest** or **Mocha**.

To run tests (if implemented):
```bash
npm test
```

Tests should cover:
- User creation
- Expense creation
- Expense retrieval (both individual and overall)
- Balance sheet generation

---

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push the branch (`git push origin feature/new-feature`).
5. Create a new Pull Request.

---

## License

This project is open-source and licensed under the MIT License.

---

### That completes the **README.md** file for this application.