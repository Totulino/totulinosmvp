# Totulino's MVP -

You will create a biking route optimization full stack app using React, Node/Express, and MySQL.

## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called facebook: `create database facebook`
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=mvp
  DB_PASS=root
```

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create a table called 'students' in your database.

- Make sure you understand how the `students` table is constructed. In your MySQL console, you can run `use facebook;` and then `describe students;` to see the structure of the students table.

### Development

- Run `npm start` in project directory to start the Express server on port 4000
- In another terminal, do `cd client` and run `npm run dev` to start the client in development mode with hot reloading in port 5173.

## Basic Requirements

Create a webpage with the following functionality:

-

To accomplish this, you will need to:

- [ ] Finish the routes in the API server (`/routes/students.js`).
- [ ] Finish the front end (`/client/src/`). Create as many components as you need.

## Guidelines

## Tips

## Self-Assessment
