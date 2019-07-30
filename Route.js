//QUEUE CLASS
class PriorityQueue {
    constructor() {
      this.collection = [];
    }
    enqueue(element){
        if (this.isEmpty()){ 
          this.collection.push(element);
        } else {
          let added = false;
          for (let i = 1; i <= this.collection.length; i++){
            if (element[1] < this.collection[i-1][1]){ 
              this.collection.splice(i-1, 0, element);
              added = true;
              break;
            }
          }
          if (!added){
              this.collection.push(element);
          }
        }
      };
      dequeue() {
        let value = this.collection.shift();
        return value;
      };
      isEmpty() {
        return (this.collection.length === 0) 
      };
}


class Graph {
    constructor() {
      this.nodes = [];
      this.adjacencyList = {};
    }

    addNode(node) {
        this.nodes.push(node); 
        this.adjacencyList[node] = [];
      }

      addEdge(node1, node2, weight, color) {
        this.adjacencyList[node1].push({node:node2, weight: weight, line: color});
        this.adjacencyList[node2].push({node:node1, weight: weight, line: color});
      }

      //Djikstra
    shortestRoute(startNode, endNode) {
    console.log("--Directions from " + startNode + " to " + endNode + "--\n");
    var start=startNode;
    let times = {};
    let backtrace = {};
    let pq = new PriorityQueue();
    times[startNode] = 0;
    this.nodes.forEach(node => {
    if (node !== startNode) {
      times[node] = Infinity
    }
  });
  pq.enqueue([startNode, 0]);
  while (!pq.isEmpty()) {
    let shortestStep = pq.dequeue();
    let currentNode = shortestStep[0];
    this.adjacencyList[currentNode].forEach(neighbor => {
      let time = times[currentNode] + neighbor.weight;
      if (time < times[neighbor.node]) {
        times[neighbor.node] = time;
        backtrace[neighbor.node] = currentNode;
        pq.enqueue([neighbor.node, time]);
      }
    });
  }
  let path = [endNode];
  let lastStep = endNode;
  var change = [];
  var count=0;
  while(lastStep !== startNode) {
<<<<<<< Updated upstream
    path.unshift(backtrace[lastStep])
    lastStep = backtrace[lastStep]
  }
  console.log("Path is \n" + path + " and time is " + times[endNode]) +" minutes.";
=======
    if(this.getline(lastStep,backtrace[lastStep])!=this.getline(backtrace[lastStep],backtrace[backtrace[lastStep]]))
      if(backtrace[lastStep]==startNode)
        ;
      else {
        change[count] = "Change from " + this.getline(backtrace[lastStep],backtrace[backtrace[lastStep]]) + " to " + this.getline(lastStep,backtrace[lastStep])  + " at " + backtrace[lastStep];
        count++;
    }
    path.unshift(backtrace[lastStep])
    lastStep = backtrace[lastStep]
  }
  for(var i=count-1; i>=0; i--)
   console.log(change[i]);
  
  console.log("\nComplete Route is \n" + path + " and time is " + times[endNode] +" minutes.");
>>>>>>> Stashed changes
      }

printGraph(sta) 
{ 
  console.log("--Adjacency List Of " + sta + "--")
  for(var i=0; i<this.adjacencyList[sta].length; i++)
    console.log(this.adjacencyList[sta][i]);
}
}


let g = new Graph();



//
//METRO LINES
//



//Blue Line

blue=require("./lines/blue.json");
var blueline = [];
for(var i=0; i<50; i++)
{
    blueline[i]=blue[i]["Hindi"];
}

for (var i = 0; i < blueline.length; i++) { 
    g.addNode(blueline[i]); 
} 

for(var i=0; i<49; i++){
    g.addEdge(blueline[i], blueline[i+1], 2.02, "blue"); 
}



//BlueBranch
bluebranch=require("./lines/bluebranch.json");
var bluebranchline = [];
for(var i=0; i<11; i++)
{
  
        bluebranchline[i]=bluebranch[i]["Hindi"];
}

for (var i = 0; i < bluebranchline.length; i++) { 
  //Skip Interchange
  if(bluebranchline[i]=='Yamuna Bank')
    continue;
  else
    g.addNode(bluebranchline[i]); 
} 

for(var i=0; i<10; i++){
    g.addEdge(bluebranchline[i], bluebranchline[i+1], 1.875, "bluebranch"); 
}

//Magenta 
magenta=require("./lines/magenta.json");
var magentaline = [];
for(var i=0; i<magenta.length; i++)
{
        magentaline[i]=magenta[i]["25"];
}
for (var i = 0; i <magentaline.length; i++) { 
  //Skip Interchange
  if(magentaline[i]=='Janakpuri West')
    continue;
  if(magentaline[i]=='Botanical Garden')
    continue;
  else
    g.addNode(magentaline[i]); 
} 
for(var i=0; i<(magentaline.length-1); i++){
    g.addEdge(magentaline[i], magentaline[i+1],2.36, "magenta"); 
}

//Yellow Line
yellow=require("./lines/yellow.json");
var yellowline = [];
for(var i=0; i<yellow.length; i++)
{
         yellowline[i]=yellow[i]["Hindi"];
}
for (var i = 0; i < yellowline.length; i++) { 
  if(yellowline[i]=='Hauz Khas' || yellowline[i]=='Rajiv Chowk')
   continue;
    else
    g.addNode(yellowline[i]); 
} 
for(var i=0; i<(yellowline.length-1); i++){
    g.addEdge(yellowline[i], yellowline[i+1],2.22, "yellow"); 
}


//Violet Line
violet=require("./lines/violet.json");
var violetline = [];
for(var i=0; i<violet.length; i++)
{
  
  violetline[i]=violet[i]["Hindi"];
}
for (var i = 0; i < violetline.length; i++) { 
  if(violetline[i]=='Kashmere Gate' || violetline[i]=='Mandi House' || violetline[i]=='Central Secretariat' || violetline[i]=='Kalkaji Mandir')
   continue;
    else
    g.addNode(violetline[i]); 
} 
for(var i=0; i<(violetline.length-1); i++){
    g.addEdge(violetline[i], violetline[i+1],2.24, "violet"); 
}



//red Line
red=require("./lines/red.json");
var redline = [];
for(var i=0; i<red.length; i++)
{
  
  redline[i]=red[i]["Hindi"];
}
for (var i = 0; i < redline.length; i++) { 
  if(redline[i]=='Kashmere Gate')
   continue;
    else
    g.addNode(redline[i]); 
} 
for(var i=0; i<(redline.length-1); i++){
    g.addEdge(redline[i], redline[i+1],2.03, "red"); 
}



//green Line
green=require("./lines/green.json");
var greenline = [];
for(var i=0; i<green.length; i++)
{
  greenline[i]=green[i]["Hindi"];
}
for (var i = 0; i < greenline.length; i++) { 
  if(greenline[i]=='Inderlok')
   continue;
    else
    g.addNode(greenline[i]); 
} 
for(var i=0; i<(greenline.length-1); i++){
    g.addEdge(greenline[i], greenline[i+1],2.49, "green"); 
}


//greenbranch Line
greenbranch=require("./lines/greenbranch.json");
var greenbranchline = [];
for(var i=0; i<greenbranch.length; i++)
{
  greenbranchline[i]=greenbranch[i]["Hindi"];
}
for (var i = 0; i < greenbranchline.length; i++) { 
  if(greenbranchline[i]=='Kirti Nagar' || greenbranchline[i]=='Ashok Park Main')
   continue;
    else
    g.addNode(greenbranchline[i]); 
} 
for(var i=0; i<(greenbranchline.length-1); i++){
    g.addEdge(greenbranchline[i], greenbranchline[i+1],1.33, "greenbranch"); 
}

//pink Line
pink=require("./lines/pink.json");
var pinkline = [];
for(var i=0; i<pink.length; i++)
{
  pinkline[i]=pink[i]["Hindi"];
}
for (var i = 0; i < pinkline.length; i++) { 
  if(pinkline[i]=='Azadpur' || pinkline[i]=='Netaji Subhash Place' || pinkline[i]=='Rajouri Garden' || pinkline[i]=='INA' || pinkline[i]=='Lajpat Nagar' || pinkline[i]=='Mayur Vihar – I')
   continue;
    else
    g.addNode(pinkline[i]); 
} 
for(var i=0; i<(pinkline.length-1); i++){
    g.addEdge(pinkline[i], pinkline[i+1],2.69, "pink"); 
}

//pinkbranch Line
pinkbranch=require("./lines/pinkbranch.json");
var pinkbranchline = [];
for(var i=0; i<pinkbranch.length; i++)
{
  pinkbranchline[i]=pinkbranch[i]["Hindi"];
}
for (var i = 0; i < pinkbranchline.length; i++) { 
  if(pinkbranchline[i]=='Anand Vihar' || pinkbranchline[i]=='Karkarduma' || pinkbranchline[i]=='Welcome')
   continue;
    else
    g.addNode(pinkbranchline[i]); 
} 
for(var i=0; i<(pinkbranchline.length-1); i++){
    g.addEdge(pinkbranchline[i], pinkbranchline[i+1],2.27, "pinkbranch"); 
}





//ShortestRouteCall
<<<<<<< Updated upstream
g.shortestRoute("Model Town", "Palam");
=======
//g.printline("Janakpuri West", "Janakpuri East");
g.shortestRoute("Palam", "Durgabai Deshmukh South Campus");
>>>>>>> Stashed changes

//AdjList of Station
//g.printGraph("Rajouri Garden");


//NOTE
//
//TRY LISTING IGNORE INTERCHANGE STATION IN ADD NODE ONLY
//

//Order of Lining:
//Blue
//BlueBranch
//Magenta
//Yellow
//Violet
//Red
//Green
//Green Branch
//Pink
//Pink Branch