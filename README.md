# Totulino's MVP - take your bike on a stroll

This project is a location tracker for your often visited destination with the bike, using React, Node/Express, and MySQL.

## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`

- If you look at the init_db_sql file you will see, there are two tables: `intervals` and `trips`.

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create and connect those tables to your mysql

- Make sure you understand how the `intervals` table is constructed. In your MySQL console, you can run `use intervals ;` and then `describe intervals ;` to see the structure of the intervals table. Do the same with the `trips` table

### Development

- Run `npm start` in project directory to start the Express server on port 4000
- In another terminal, do `cd client` and run `npm run dev` to start the client in development mode with hot reloading in port 5173.

## About the project

- There are 6 hard-coded `trip_type` in `src>utilities>types.js` (please open that now). If you look at your port5173 you will see that those are the 6 dropdown options.

- By clicking on Go : the user selects a `trip_type` depending where they want to go. The button Start Biking will start your new `Trip`with a new `trip_id`

- After that there is an automatic capture of geolocation every 30 seconds that will show on the screen

-As you are just sitting with your nice ass on the chair you will not actually see a change in the latitude and longitude. To do so go to your console > click on the 3 dots in the top right corner > more tools > sensors.
set Location to whatever and you will see the geolocaiton on your page change.

## Process

- Play around with the page and skim read the back-end and front-end before reading the rest.

## Endpoints - routes > index.js

- I started the project by creating end-points (Look through them).
- Everything is self explanatory. The only one that might seem new is the one `"SELECT id FROM trips ORDER BY id DESC LIMIT 1"`
  - Each trip_type like "Home to Codeop" has multiple trips as you perform that trip many times. So everytime we perform the operation "Start Biking" we want to insert a new trip in the trip_type and we want it to return us the last id we just added so the trip we are in right now , to the front end so we can use to perform other stuff.

## Front End

- I used react router. There is a `Home` page that allows you to choose the Trip_type. The home page is linked to a sub route `Trip` component where you can actually press play stop and resume a trip.

## Geolocation

- The big thing about this project is the geolocation. Capturing geolocation, you can read the documentation here : https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API

- To capture the interval you cannot use the react hook that is built in `setInterval` but the `useInterval` react hook that was built by someone read these two documents if you want to understand the logic behind it. : https://overreacted.io/making-setinterval-declarative-with-react-hooks/ , https://www.joshwcomeau.com/snippets/react-hooks/use-interval/

- the react hook ( written by someone else) is in the hooks folder and is being imported into `Trip`. This useInterval runs in the background and as soon as the start biking is clicked on the useInterval function begins starts ( line 67) and runs every 30 seconds.

## Styling

- Styling was done with bootstrap

## Future

1. Actually map the array of intervals [latitude and longitude] using https://leafletjs.com/ on a small map

2. In each trip_type have a section where you can select old trips and if you click on them, they are featured and you can see the little map with the details.

3. create users (2FA)

whatever you think of

! Good luck and enjoy !
