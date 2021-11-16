# TVS Credit E.P.I.C IT Challenge Case Study 3 - Backend Development

### Github Repository for Mobile Application: https://github.com/shahjigar556/finance_buddy

### Github Repository for Frontend Web Application: https://github.com/raj2729/Finance-Buddy-Web-Frontend

## Project Structure - Backend Development

```
.
├── config/             -> Contains function to connect database
├── controllers/        -> Backend logic for the api endpoints
├── middlewares/        -> Protected routes and Generate Token middlewares
├── models/             -> Contains database models
├── routes/             -> Defines api endpoints
├── index.js            -> Main File
└── package.json        -> Npm package.json file
```

## Technology Stack - Backend Development

- Backend Application developed using Node.js and Express
- User Authentication using JsonWebToken
- Data stored in cloud via MongoDB Atlas
- Passwords are stored securely by salting and hashing using bcryptjs

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- npm
  ```
  npm install npm@latest -g
  ```

### Installation

- Clone the repository
  ```
  git clone https://github.com/raj2729/Finance-Buddy-Backend.git
  ```
- Install NPM packages for Backend Development

  ```
  cd Finance-Buddy-Backend
  npm install

  ```

- The Backend Server is running on port `8080`

### Usage

```
npm start
```

## Deployment
The Backend API Endpoints are deployed on Heroku: https://finance-buddy-api.herokuapp.com/
