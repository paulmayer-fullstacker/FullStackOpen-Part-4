# Full Stack Open: Exercises for Part-4 - Bloglist Backend

## Introduction:

Herewith my submission of the exercises required for Modul 4. Specifically, exercises 4.1 to 4.23 (inc.). These exercises progressively developed the backend of a Bloglist application. No formal specification was declared from the outset. So, the project has evolved to this point (exercise submission). The project is contained within my 'part4-bloglist-backend' project directory.

---

## The Solution:

The backend has been developed in isolation (from any frontend). So, during development, conformity was confirmed through suites of automated testing and manual testing.

The scripts have been judiciously commented with inline documentation. So, we will not indulge in further explanation. We will simply cover the bare minimum information required to run and test the application, and to fulfil the exercise requirements.

### Automated Testing

Automated test suites can be found in the tests/list_helper.test.js and tests/bloglist_api.test.js files. The suites can be executed from the cmd line by running: npm run test.

### Manual testing

API requests, for manual testing via VSCode's REST Client, can be found in the request.rest file. To run manual testing, the server must be running. To run the service, for test purposes run: npm run dev. The server will then be listening on port 3002.

### Seeding the Database

VSCode's REST Client can be used to populate the database (creating users and blogs). Alternatively, we can use a seeding function (seed-mongo-db.js), and preconfigured seeding data (utils/seeding_data.js). To execute the seeding process, from the cmd line, run: npm run seed. Seeding should be completed before the server is started.


### Version Control

The project (part4-bloglist-backend) has been pushed to my GitHub repository at https://github.com/paulmayer-fullstacker/FullStackOpen-Part-4. The project found at https://github.com/paulmayer-fullstacker/FullStackOpen-Part-4/part4-bloglist-backend, represent the final submission to exercise 4.23.

Tags have been used to identify key points in development: milestone/part4-exercises-4.1-4.7 and milestone/part4-exercises-4.8-4.14. Development snapshots can be viewed at these tag points.


---

<br/>

<hr style="height: 5px; background-color: black; border: none;">
