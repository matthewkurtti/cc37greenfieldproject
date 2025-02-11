<img src="./client/src/assets/sc_logo_regular_dark.png" alt="SoundCrowd's Logo" width="400"/>

# The Concept
## "It's like GitHub for musicians..."
Music creators lack an easy, industry-focused way to connect and collaborate globally, limiting their access to diverse song stems and co-creation opportunities. Current methods are fragmented, slowing down innovation and creativity.
## Enter SoundCrowd
SoundCrowd is a dynamic music collaboration platform that enables creators to share and request song stems. We foster a community of global music co-creation. Our identity reflects the collaboration, innovation, harmony, and excitement of our platform.
- Connects musicians across the world
- Easy way to create entire songs "solo"
- Asynchronous and always avaliable

# Find Us Here ⬇️

### [SoundCrowd](https://soundcrowd.onrender.com/)

# Running Locally
1. Download or clone this repository
2. Open in your IDE
3. Navigate to the client directory and install
```console
cd client
npm run install
```
4. Start the dev server
```console
npm run dev
```
5. Navigate to the server directory and install
```console
cd ../server
npm run install
```
6. Start the Express dev server
```console
npm run express-dev
```
7. Create a local database using PSQL
   1. Connect to PSQL (how to do this differs depending on OS)
   2. Create a new database
    ```sql
    CREATE DATABASE sound_crowd;
    ```
    3. Run migrations
    ```console
    npm run migrate-latest
    ```
8. Create a `.env.local` file in the root of the server directory
```
DB_USER=<insert user>
DB_PASSWORD=<insert password>
DB_NAME=sound_crowd
DB_HOST=localhost
DB_PORT=5432
SESSION_SECRET=<insert a random secret string for session storage>
```
9. You will also need to add the following environment varaibles for the Google Drive API
```
CLIENT_ID=<insert client ID>
CLIENT_SECRET=<Insert client secret>
REDIRECT_URI=<Insert redirect URI>
REFRESH_TOKEN=<Insert refresh token>
```
If you are not sure how to obtain these details please contact a member of the team and we'll be happy to help.

10. If everything went as planned you should be up and running on http://localhost:5173/

## Our Tech Stack
The front end of SoundCloud was built using TypeScript and React the back end was built using Node.js, Express, PostgreSQL and Knex.js

Our file upload system relies heavily on the Google Drive API. Thank you Google 🙏.

# The team


<a href="https://github.com/TeamMaraca/cc37greenfieldproject/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=TeamMaraca/cc37greenfieldproject" />
</a>


