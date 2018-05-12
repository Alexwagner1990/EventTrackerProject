## Skill Distillery EventTracker Project

### How to Use This Project

This project can be run by running the TournamentREST project as a Spring Boot app. Once the app runs successfully, the data can be accessed via Postman from localhost8080/api/tournament/{controller route here}. The app uses MySQL with some test data - this can be accessed using the MySQL credentials tournamentplayer (user) and tournament(password). The app can also be run on the AWS server, with the address http://13.58.147.59:8080 (TBD)

The user can find a tournament by keyword with the path /api/tournament/{your keyword} (GET request)

The user can create a tournament with the path /api/tournament/new, with a body of the JSON of a valid Tournament object. The method will check if the tournament was created with no name and return a null if the title is empty.  (POST request)

The user can update a tournament with the path /api/tournament/update/{id of tournament to update}, with a body of the JSON you'd like to update (PATCH request)

The user can delete a tournament with the path /api/tournament/delete/{id of tournament to delete} (DELETE request)

### Project Description

Growing up I participated in a lot of chess tournaments, so I decided to write an event tracker that tracks the results of tournaments you participate in. The database so far only has a tournament table, which has an id, name, description, start_date, rounds won/lost/drawn, place, and total players column. It also has a type column - originally I zeroed in on the tournament concept from chess tournaments, but I decided to keep the tournament generic so the concept could be expanded as necessary. In a later release, users will be released so that multiple people can use the event tracker.

The app thus far does not have a front end, but data can still be sent and received from Postman. So far a client can get all the tournaments, update a tournament, find a specific tournament by a keyword (in the name, description or type), and delete a tournament. Other functionality will be added to aggregate data in more ways at a later date.

### Lessons Learned

I'm starting to get a bit more comfortable with using MySQL workbench. I spent too long on an issue where the forward engineer did not generate the CREATE SCHEMA statements, but it ended up being an easy fix - I was missing the GENERATE USE STATEMENTS checkbox. The computer has to do what I tell it to do, but only if I tell it correctly.

Spring Boot saved a lot of time setting up the project. I was a bit uneasy about the setup, but it ended up being relatively straightforward - just remembering a few key steps integrated the project with minimal issues. Exporting the WAR file proved to be a challenge - our usual way of exporting WAR files did not work the same way for Spring REST projects.

The JpaRepository has a lot of powerful functionality in not-very-many lines of code. So much was able to be accomplished with not a lot of code.
