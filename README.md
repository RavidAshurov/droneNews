# Drone News

Web application for drone related news curating.

The Application is constructed of 3 projects:

   1. Api server (NodeJs + Express)
   2. Client App (Vue)
   3. Data collection microservice (NodeJs)

Database used for this app is SQLite (chosen for the easy setup and the size and expected use of the data).

Project was created on Node 23.1.0 environment. Please make sure to have npm and node installed.

### To start the application

1. create a `.env` file in the project root, and set the following content

   ```
   API_KEY=<api key for news api>
   DB_LOCATION=<local path that the process will write and SQLITE database to>
   PORT=<port num for the api server> // Optional, defaults to 3000
   ```

2. [Optional - only if api port was set!] create a `.env` file under `client-app` folder, and set the following content

   ```
   VITE_API_SERVER_URL=http://localhost:<insert_new_api_port>
   ```

3. execute the following: (from project root)

   ```
   npm i
   npm run start
   ```

   Once command run, application will be available on: <http://localhost:4000/> (link should be printed out in console)
