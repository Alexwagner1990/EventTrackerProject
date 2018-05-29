## Skill Distillery EventTracker Project

### How to Use This Project
ANGULAR DESCRIPTION:
This project can be opened via web browser by visiting the address http://13.58.147.59:8080/TournamentREST/.

UPDATED DESCRIPTION:
The user can access the Tournament Tracker app via the web address http://13.58.147.59:8080/EventTracker. From the home page, tournaments can be manipulated via the web buttons, all form the same page.

THE BELOW IS DEPRECIATED:
This project can be run by running the TournamentREST project as a Spring Boot app. Once the app runs successfully, the data can be accessed via Postman from localhost8080/api/tournament/{controller route here}. The app uses MySQL with some test data - this can be accessed using the MySQL credentials tournamentplayer (user) and tournament(password). The app can also be run on the AWS server, with the address http://13.58.147.59:8080/EventTracker

There appears to be a problem with the Jackson libraries handling creating Dates - I have disabled the dates in the database until I can figure out the solution to the problem.

The user can find a tournament by id with the path /api/tournament/{id of tournament} (GET request) - On the front end this will be used when selecting form the search by keyword results.

The user can find a tournament by keyword with the path /api/tournament/{your keyword} (GET request)

The user can create a tournament with the path /api/tournament/new, with a body of the JSON of a valid Tournament object. The method will check if the tournament was created with no name and return a null if the title is empty.  (POST request)

The user can update a tournament with the path /api/tournament/update/{id of tournament to update}, with a body of the JSON you'd like to update (PATCH request)

The user can delete a tournament with the path /api/tournament/delete/{id of tournament to delete} (DELETE request)

The user can find the total number of rounds he or she has won across all tournaments with the path /api/tournament/all/wins (GET request)

The user can find the total number of rounds he or she has lost across all tournaments with the path /api/tournament/all/losses (GET request)

The user can find the total number of rounds he or she has drawn across all tournaments with the path /api/tournament/all/draws (GET request)

The user can find the average number of rounds he or she wins per tournament with the path /api/tournament/average/wins (GET request)

The user can find the average number of rounds he or she loses per tournament with the path /api/tournament/average/losses (GET request)

### Project Description
ANGULAR DESCRIPTION:
This project now has an Angular front end, meaning tournaments can be manipulated with Angular tools. Functionality otherwise has not changed.

UPDATED DESCRIPTION:
The user can interact with the Event Tracker web app from the front-end by visiting the address http://13.58.147.59:8080/EventTracker/. By selecting the corresponding buttons, the user can add, edit, view, and delete tournament info from a single web page, with views manipulated by JavaScript through RESTful controller/database routes. The user can add tournaments, update tournaments, view all tournaments, search for tournaments, as well as get information about total and average tournament wins, losses and draws.

THE BELOW IS DEPRECIATED:
Growing up I participated in a lot of chess tournaments, so I decided to write an event tracker that tracks the results of tournaments you participate in. The database so far only has a tournament table, which has an id, name, description, start_date, rounds won/lost/drawn, place, and total players column. It also has a type column - originally I zeroed in on the tournament concept from chess tournaments, but I decided to keep the tournament generic so the concept could be expanded as necessary. In a later release, users will be released so that multiple people can use the event tracker.

The app thus far does not have a front end, but data can still be sent and received from Postman. So far a client can get all the tournaments, update a tournament, find a specific tournament by a keyword (in the name, description or type), and delete a tournament. Other functionality will be added to aggregate data in more ways at a later date.

### Lessons Learned
ANGULAR LESSON:
Working with Angular made me really appreciate just how "expensive" it is for programs to make trips to the database. I had previously written controller routes that calculated averages and totals of wins, losses and draws, but calling back to the database every time one of these values needed to be updated ended up straining my local machine - the browser would crawl to a halt. Since I had already retrieved all the tournaments, I needed to refactor my approach to handle that logic on the front-end programatically, without re-establishing a database connection.

For this reason, I think I should have utilized pipes better. If I'm grabbing all the tournaments in some kind of index function, further filtering could probably be done more effectively via pipes on the Angular side. In the future, I'll likely use pipes when I don't need to make another trip to the database to conserve processing power.

UPDATED DESCRIPTION:
Going into this project, I thought I had a better handle on event listeners - I understood them as functions that were "bundled" to particular document objects at runtime, but from running the program it became clear that the event listeners weren't binding at runtime as I thought. To get around this problem I tried separating the event listener functions from the actual "business" of the function. For instance, I found more success in separating the display indexing function from the event listener that activated the index button.

Working with javascript, I can see the potential for how powerful javascript can be, both for better and for worse - being able to set anything into a variable makes the language more versatile in some ways than Java, but in other ways that variability was a bit paralyzing. When a compiler isn't catching your mistakes, bug tracking can be much harder.

I'm not sure if it was this project in particular or Javascript more generally, but Javascript has seemed much more verbose than Java so far, especially when writing lines to manipulate the DOM. Especially since JavaScript is pretty lax in terms of organization, going forward I'm really going to have to organize Javascript code effectively and break it down into manageable chunks or I can definitely see how I could potentially drown in a sea of Javascript (with no compiler to throw me a lifesaver).

THE BELOW IS DEPRECIATED:
I'm starting to get a bit more comfortable with using MySQL workbench. I spent too long on an issue where the forward engineer did not generate the CREATE SCHEMA statements, but it ended up being an easy fix - I was missing the GENERATE USE STATEMENTS checkbox. The computer has to do what I tell it to do, but only if I tell it correctly.

Spring Boot saved a lot of time setting up the project. I was a bit uneasy about the setup, but it ended up being relatively straightforward - just remembering a few key steps integrated the project with minimal issues. Exporting the WAR file proved to be a challenge - our usual way of exporting WAR files did not work the same way for Spring REST projects.

The JpaRepository has a lot of powerful functionality in not-very-many lines of code. So much was able to be accomplished with not a lot of code.
