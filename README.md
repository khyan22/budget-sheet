# Budget Sheet

## Summary
Budget sheet is a budget tracker made using express and MongoDB. The application stores expenses in MongoDB that can be either added or removed whenever the users wants. ALL changes made while offline will be stored using indexedDB and gets posted to the db on the next successful connection.
## Code Breakdown
### Server.js
This files contains the express server and the connection to MongoDB.
### Transaction.js
this file holds the schema for a single budget object.
### API 
this file contains all routes for the transaction model.
### IDb.JS
This file contains all of code that is used to save data while offline as well as sending it to MongoDB once a connection is reestablished.
### Index.js
The code contained in this file makes the main page functional. It will send a POST request to the db and has a catch that will execute saveRecord(), which stores the data in IDB.
### Service-Worker.js
this files contains the service worker that declares files to be chached and uses event listeners to install, activate and send fetch request.

## Deployed Application