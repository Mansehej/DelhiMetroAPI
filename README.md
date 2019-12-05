# Delhi Metro API
A Javascript based API for calculating the shortest path between two metro stations.

## Data Sources
Data about stations per line is downloaded from Wikipedia tables (https://en.wikipedia.org/wiki/Red_Line_(Delhi_Metro)), etc. for each line.

## Working
The metro lines are implemented in a Graph Data Structure in Javascript. 
Each station is considered as a node and time between stations is alloted as the weights between two nodes. 
An additional parameter "Metro line" is given to each edge. 
Dijkstra's algorithm is used to find the route with the least time between two stations. 
Changes of the Metro Line parameters are used to calculate interchanges and include the interchange time.

## Hierarchy
functions/functions/route.js contains the code importing the lines with stations and calculating the shortest route. The folder functions/functions/lines contains the json files of the stations of all metro lines.

## Lines Implemented
The following lines have been implemented (in order):</br>
  ->Blue : 2.02 minutes</br>
  ->Blue Branch : 1.875 minutes</br>
  ->Magenta : 2.36 minutes</br>
  ->Yellow : 2.22 minutes</br>
  ->Red : 2.03 minutes</br>
  ->Green : 2.49 minutes</br>
  ->Green Branch : 1.33 minutes</br>
  ->Violet : 2.24 minutes</br>
  ->Pink : 2.69 minutes</br>
  ->Pink Branch : 2.43 minutes</br>
  ->Orange (Airport Express Line) : 5.2 minutes</br>
  ->Aqua : 2.86 minutes</br>
  ->Grey : 2.10 minutes</br>
  ->Rapid Metro : 5.2 minutes</br>
## Features
  ->Get shortest complete path from Source Station to Destination Station</br>
  ->Get list of Interchange Stations in order</br>
  ->Get Metro Lines Changed</br>
  ->Get Total Travel Time</br>
  ->Get Final Station of Metro Line in direction of destination/next interchange</br>

## Status Codes
  Status codes are returned in the response in JSON format as 'status':statusCode. The value of different status codes are:</br>
  Result succesfully generated: 200 </br>
  Same source and destination: 204</br>
  Undefined source or destination: 400</br>
  Invalid source: 4061</br>
  Invalid destination: 4062</br>
  Invalid source and destination: 406</br>
  <b>Please note that these status codes are returned in the JSON response and not as HTTP status codes</b>
 
 ## API Calling
  The API is hosted on Google Firebase, and can be called at:</br>
  https://us-central1-delhimetroapi.cloudfunctions.net/route-get
  with a GET query and parameters as from (source station) and to (destination station).</br>
  For example, the API call for a route between Dwarka and Palam would be: https://us-central1-delhimetroapi.cloudfunctions.net/route-get?from=Dwarka&to=Palam.</br>
  The stations to be passed in the parameters must start with a capital letter. The stations must be passed as they are written in the /StationList.txt file.
