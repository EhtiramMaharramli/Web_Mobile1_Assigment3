# Live Page:
 https://ehtirammaharramli.github.io/Web_Mobile1_Assignment3/"
# Flashcards React App
# Overview
The Flashcards React App is a web application that allows users to create, edit, and manage flashcards. This README provides clear instructions for setting up and running the application.

# Installation
Make sure that you have Node.js installed on your machine before you follow the steps below.

Clone this repository: git clone https://github.com/EhtiramMaharramli/Web_Mobile1_Assignment3.git or download source code as a ZIP file
Load project
Install dependencies by typing npm install
Start the development server: npm start
Open your browser and visit http://localhost:3000 to view the application.
Type json-server --watch db/football.json --port 3000 to start JSON server for flashcards and messages.

# Usage
Creating a New Flashcard:
Click the "Create" button.
Fill in the question, answer, and status in the form.
Click "Add Flashcard" to save.
# Editing a Flashcard:

Click the "Edit" button on the desired flashcard.
Modify the question, answer, or status in the popup.
Click "Update Flashcard" to save changes or "Cancel" to discard.
# Deleting a Flashcard:

Click the "Delete" button on the desired flashcard.
Confirm the deletion.
# Searching and Filtering:

Use the search bar to filter flashcards based on text.
Choose a status from the dropdown to filter by status.
# Sorting:

Use the "Sort By" dropdown to select sorting criteria.
# Flipping a Flashcard:

Click on a flashcard to flip it and view the back.
# Adding Flashcards from the Server:

The application fetches flashcards from the server on startup.
Ensure your server is running and accessible.
# Server Configuration
This application assumes a RESTful API for managing flashcards. The default API endpoint is http://localhost:3000/cards. If your API server is running on a different port or domain, update the API endpoint accordingly in the code.



