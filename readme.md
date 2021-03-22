## Merced-Express

by Alex Merced of AlexMercedCoder.com

Merced-Express is a mini-framework built on top of ExpressJS with some tools to help increase speed when building applications with Express and Mongoose. This readme details how to use the features built in to this express template.

## Setup

- after generating a new project, make sure to run `npm install`

## Environment Variables

dotenv is configured so all you need to do is create a .env file and off to the races. Two environment variables ready to be used are:

- DATABASE_URL: MongoDB Connection string
- PORT: port that application will be served on

## Scripts

### npm run start

runs the server in production mode using node

### npm run dev

runs the server in dev mode using nodemon

### npm run seed

runs the seed file in db/seed.js

### npm run drop

drops the database for quick clearing of data, be careful with this one

### npm run gen <generator> <name>

list of generators

- controller: creates a new controller file and registers it with the HomeRouter
- model: creates a new model file in the models folder
- resource: creates a new model and controller, the controller has all API crud routes and is registered with the HomeRouter

example of command usage
`npm run gen resource User`

all the generators are in scrips/generate.js so feel free to customize them to your project or add new ones!

## Cors Headers

All the cors headers can be configured from config/cors.js, by default set to allow all origins, headers and methods.

## If you enjoy

If you enjoy this tool and would love to make my day here are a few ways to support my efforts:

- subscribe to my youtube channel, podcast and read my blog. Find all of these things at AlexMercedCoder.com

- Consider hiring me to consult or write code for your next project, email me at hire@alexmerced.dev