# Leroy's take on Wave's Front-end Challenge
## Overview
- Form states handled using [`react-hook-forms`](https://react-hook-form.com/)
- fully typed using Typescript
- docker support
- i18n (translation) support
- tested (using React Testing Library)
- Create React App

_Note: This application is for demonstration purposes only and may not contain all the necessary styles and tests that a truly production-ready application might have. This however is a good base to build upon on given the question requirements._

### Demo using docker
Docker will allow us to run this app in any environment without worries. To see the app, simply run:
1. `docker pull leroywan/wave-invoice`
2. `docker run -p 8080:80 leroywan/wave-invoice`
3. View the app on `http://localhost:8080/`

### Demo using yarn or npm
1. clone this repo
2. run `yarn` or `npm install`
3. run `yarn start` or `npm run start` to start the development server
4. View the app on `http://localhost:3000/`

### Build
1. run `yarn build` or `npm run build`, the newly built file should now be inside `/build`
2. run `yarn global add serve` or `npm install -g serve`
3. run `serve -s build -l 8080`
4. View the app on `http://localhost:8080/`

### Tests
1. run `yarn test` or `npm run test`

_Note: Modal-Portal may log an error but it will not affect the final result of the tests. This is a known issue since the app unmounts for each test case and a state change gets triggered in the portal after eacah test has run_

## Decisions
#### Translation support
It may seem like it breaks the YAGNI principle, but the benefit is that you get total separation between content and logic (seperation of concerns) which can greatly improve productivity because team members who may not be technically-savy can still update the content without touching much code. This also allows for an easy translation in the future when serving different geographical customer segments. 

#### React hook forms
It is much easier to use a module to handle form states than creating multiple `useState` since there are many nuances with form states that may introduce code bloat and bugs (ex. validations, dirty/clean forms, unnecessary renders). React hook forms is also a11y compliant and will handle input focuses out of the box on validation error.

#### Docker
Docker allows the app to be run in whatever environment you want without issues since your app is contained. Currently, the built docker image is the built app served using nginx. In the future, it can be very easy to add more components to it to make it a scalable production grade app (Ex. load balancing, reverse-proxy, docker compose, etc...)

#### Typescript
Coding in Typescript allows for less bugs and more readable code since interfaces and behaviors are predefined. Typescript's syntax highlighting will also point out subtle bugs that may potentially crash the app.

#### React Testing Library
The idea behind react testing library is that it tests the DOM (what the users would see and interact with) instead of implementation details such as in Enzyme. React testing library also encourages a11y compliant code while writing tests as it promtes the use of aria tags to find test elements.

#### Why React
React is very performant, the code is easily reusable, the community behind it is very strong. 

#### Why not Redux?
Redux can easily be introduced when needed as the current application does not depend on many changing application states.


## Project Description

The front-end prototype does the following:

- Retrieve the data from the GET endpoint [https://rawgit.com/wvchallenges/se-exp-challenge-invoice/master/settings.json]
- Show a compact list of customers (in the JSON under the "customers" key)
- Let the user select a customer for editing, which shows a form with name, email, channel (value may be one of 'website', 'email', 'phone', 'word-of-mouth', 'other'), address, postal, city, province
- All fields are required. Empty values presents an error message if submitted.
- On form submit, log the JSON payload to console.
