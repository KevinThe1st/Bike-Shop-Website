# One

Team Name: One

Team Members:
 - Kevin Label (Team Lead)
 - Justin Cho (API)
 - Daniel Smith (Architect)
 - Sean Mendonca (QA)
 - Kyle Chin (UI)

Team Motto: :fire: This is fine. :fire:

Pizza Topping: Jalapeño

Setup:
1. Run `npm install` in app and server directory
2. Create a SQL instance and start the server
3. In server directory, run `./update.sh`

Starting the Website:
1. In server directory, run `npm run start`
2. In app directory, run `npm run serve`
3. Go to `http://localhost:8080/` in your browser

Running API Tests:
1. In server directory, run `./setup.sh`
2. Run `npm run test`

Running End-to-End tests:
1. In server directory, run `./update.sh`
2. Run `npm run start`
3. In app directory, run `npm run test:e2e`
4. In the popup window, click on "Run all specs"

** In case of deadlock while running shell scripts, try again until it doesn't