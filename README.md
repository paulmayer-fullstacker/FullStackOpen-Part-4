# Full Stack Open: Exercises for Part-3 - Phonebook with Db

## Introduction:

Herewith my submission of the exercises required for Modul 3. Specifically, exercises 3.13.-3.21, the Phonebook with contact information (persons) persisted to a Mongo Database. Functionality has been developed over Modules 2 and 3, to reach this point. The scripts have been judiciously commented with inline documentation. So, we will not indulge in further explanation. We will simply cover the bare minimum information required to run and test the application, and to fulfil the exercise requirements.

---

## The Solution:

At this point we have two projects offered as solutions to Module-3's exercises: a deployed service and a development service.

### Development Service

The development service comprises two separate projects: part2-phonebook-frontend (provides user access to services through the API and running on Vite), and part3-phonebook-backend-db (runs on Express, and serves the API). Due to changes in the frontend, to accommodate deployment, the two projects now communicate through a Vite proxy (see the vite.config.js file).  

Both services are started in the development environment using:
 - npm run dev
The command is issued from the root directory of each individual project.

The frontend then runs at http://localhost:5173, while the backend runs at http://localhost:3002.

The development service has not been pushed to Github for submission. Rather, the deployed service has been offered as the summit of Module-3's study.

### Deployed Service

The deployed service is hosted in GitHub in the repository FullStackOpen-Part-3-PhoneBook-Db. It is based on the part3-phonebook-backend-db, with a minified version of the frontend contained within a distribution (dist/) file. The service has been deployed to Render, and can be found at:
https://fullstackopen-part-3-phonebook-db.onrender.com

The persisted server data can be viewed at:
https://fullstackopen-part-3-phonebook-db.onrender.com/api/persons

---

## REST Client Testing

The development project (part3-phonebook-backend), and the deployed service (FullStackOpen-Part-3-PhoneBook) both have request.rest test files. These files contain tests for both the local development environment and the deployed service. The tests must be run locally, as the .rest file cannot be accessed when deployed to Render.

The deployed service has been deployed to a Render free tier. After 15 minutes of inactivity (no incoming HTTP requests), free tier service are suspended by Render, to conserve resources. Thus, ensure that the service had been full reactivated and is operational before sending test requests. Also, expect significant delay (possibly a few seconds), between request and response. 

---

## Command-line Application

To fulfil exercise 3.12, a command line application was created. This application can be viewed, and run from the mongo.js file within the project's root directory. As required, the application can be run from the command line, using: node mongo.js <mongodb_password>.

---

## Linting

Per exercise 3.22, ESLint has been installed and run against the deployed service's main Javascript file (index.js). For evidence of exercise 3.22, see the eslint.config.mjs file, within the project's root directory.




---

<br/>

<hr style="height: 5px; background-color: black; border: none;">
