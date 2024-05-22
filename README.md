# League of Legends Build Manager

## Description and Objective

This project was developed as part of my studies in Development - Network Application. The objective of the course was to create a CRUD/REST application within 48 hours using a MongoDB database, an API or an RSS feed, EJS templates, and Bootstrap.

The application developed is a build manager for the game League of Legends. It allows users to create, view, update, and delete custom builds for the game's champions.

## Application Features

1. **Display Champions**: The main window showcases the available champions, their descriptions, and their various skins.
2. **Create a Build**: A build includes:
   - A name
   - The author's email
   - A champion
   - A primary rune
   - A secondary rune
3. **Delete Builds**: Users can delete only their own builds.
4. **View Builds**: All existing builds can be viewed.
5. **Update a Build**: Users can update their own builds.
6. **Authentication System**: Users must log in to use the application. The database includes a "players" collection that stores information about the players.
7. **Hashed Passwords**: Passwords are securely hashed in the database.

## Recommended Project Steps

1. Query the API in Node.js and display the results in the console.
2. Create a MongoDB database (this can be done manually).
3. Insert data from the original API into the database.
4. Read data using the created REST API.
5. Create a web server with Node.js.
6. Use EJS for templates.
7. Display the database data on the web server.
8. Integrate Bootstrap for design.
9. Ensure the paths follow REST API standards.
10. Implement data deletion with the REST API.
11. Implement data creation with the REST API.
12. Implement data updates with the REST API.

## MongoDB Structure

The database is organized as follows:
1. **Champions**: Collection that stores all information about the champions from the original League of Legends Champions API.
2. **Builds**: Collection that stores builds created by each player.
3. **Players**: Collection that stores information about each player.

## Library Installation

To install the necessary libraries for this project, run the following command:

```bash
npm install express mongoose bcryptjs cors
```

## Commands to Launch the Application

To launch the server, open a terminal in the server directory and run:

```bash
npm start
```

To launch the client, open another terminal and run:

```bash
npm run dev
```

## Models Used

- **UserModel**: Model for users.
- **ChampionsModel**: Model for game champions.
- **BuildModel**: Model for builds created by users.
- **PlayerModel**: Model for players (registered users).

## API Routes

### Users

- **GET /getUser**: Retrieves all users.
- **POST /createUser**: Creates a new user.

### Champions

- **GET /getChampions**: Retrieves all champions.

### Builds

- **GET /getBuilds**: Retrieves all builds.
- **POST /createBuild**: Creates a new build.
- **DELETE /deleteBuild/:buildName**: Deletes a build by name.
- **PUT /updateBuild/:buildName**: Updates a build by name.

### Players

- **POST /createPlayer**: Creates a new player.
- **POST /loginPlayer**: Logs in a player.

## Usage

The application allows users to manage their builds for League of Legends champions. Users can create, view, update, and delete their builds using an intuitive web interface that integrates EJS templates and Bootstrap styles for an enhanced user experience.
