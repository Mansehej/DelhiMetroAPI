# DelhiMetroAPI
A Javascript based API for calculating the shortest path between two metro stations.

## Data Sources
Data about stations per line is downloaded from Wikipedia tables (https://en.wikipedia.org/wiki/Red_Line_(Delhi_Metro)), etc. for each line.

## Working
The metro lines are implemented in a Graph data structure in Javascript. Each station is considered as a node and time between stations are alloted as the weights between two nodes.
Dijkstra's algorithm is used to find the route with the least time between two stations.

## Hierarchy
Route.js contains the code importing the lines with stations.
The folder /lines contains the json files of the stations of all metro lines.

## Current Progress
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
  ->Orange (Airport Express Line)
