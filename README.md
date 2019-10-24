# DelhiMetroAPI
A Javascript based API for calculating the shortest path between two metro stations.

## Data Sources
Data about stations per line is downloaded from Wikipedia tables (https://en.wikipedia.org/wiki/Red_Line_(Delhi_Metro)), etc. for each line.

## Working
The metro lines are implemented in a Graph data structure in Javascript. 
Each station is considered as a node and time between stations is alloted as the weights between two nodes. 
An additional parameter "Metro line" is given to each edge. 
Dijkstra's algorithm is used to find the route with the least time between two stations. 
Changes of the Metro Line parameters are used to calculate interchanges and include the interchange time.

## Hierarchy
functions/index.js contains the code importing the lines with stations.
The folder functions/lines contains the json files of the stations of all metro lines.

## Lines Implemented
The following lines have been implemented (in order):</br>
  ->Blue</br>
  ->Blue Branch</br>
  ->Magenta</br>
  ->Yellow</br>
  ->Red</br>
  ->Green</br>
  ->Green Branch</br>
  ->Violet</br>
  ->Pink</br>
  ->Pink Branch</br>
  ->Orange (Airport Express Line)</br>
  ->Aqua </br>
  ->Grey</br>
  ->Rapid Metro</br>
## Features
  ->Get shortest complete path from Source Station to Destination Station</br>
  ->Get list of Interchange Stations in order</br>
  ->Get Metro Lines Changed</br>
  ->Get Total Travel Time</br>
  ->Get Final Station of Metro Line in direction of destination/next interchange</br>
 
 ## API Calling
  The API is hosted on Google Firebase, and can be called at:</br>
  https://us-central1-delhimetroapi.cloudfunctions.net/route-get
  with a GET query and parameters as from (source station) and to (destination station).</br>
  For example, the API call for a route between Dwarka and Palam would be: https://us-central1-delhimetroapi.cloudfunctions.net/route-get?from=Dwarka&to=Palam.
