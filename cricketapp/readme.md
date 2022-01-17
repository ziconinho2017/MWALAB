This repo contain application for retrieving data about ICC Cricket top ranking teams with players
These API need to be called to do transaction in this Application.
####To create Team
Post Request
http://localhost:8080/api/teams/
pass body
{
    "rank" : 1,
    "name" : "New Zealand",
    "matchplayed" : 160
}
###To get all the teams
Get Request
http://localhost:8080/api/teams/

###To get a teams
Get Request with id
http://localhost:8080/api/teams/:teamId

###To delete a team
Delete Request
http://localhost:8080/api/teams/:teamId

####To update a Team
Put/Patch Request
http://localhost:8080/api/teams/:teamId
pass body
{
    "rank" : 1,
    "name" : "New Zealand",
    "matchplayed" : 160
}

####To create a Player in a Team
Post Request
http://localhost:8080/api/teams/:teamId/players/
pass body
{
    "name" : virat Kohli,
    "age" : 32
}
###To get all the players in a team
Get Request
http://localhost:8080/api/teams/:teamId/players

###To get a particular player in a team
Get Request with team id and player id
http://localhost:8080/api/teams/:teamId/players/:playerId

###To delete a player in a team
Delete Request
http://localhost:8080/api/teams/:teamId/players/:playerId

####To update a player in a team
Put/Patch Request
http://localhost:8080/api/teams/:teamId/players/:playerId
pass body
{
    "name" : "Virat Kohli",
    "age" : 32
}