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

      addEdge(node1, node2, weight) {
        this.adjacencyList[node1].push({node:node2, weight: weight});
        this.adjacencyList[node2].push({node:node1, weight: weight});
      }

      //Djikstra
    shortestRoute(startNode, endNode) {
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
  while(lastStep !== startNode) {
    path.unshift(backtrace[lastStep])
    lastStep = backtrace[lastStep]
  }
  console.log("Path is \n" + path + " and time is " + times[endNode]) +" minutes.";
      }

printGraph(sta) 
{ 
  for(var i=0; i<5; i++)
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
    g.addEdge(blueline[i], blueline[i+1],2); 
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
    g.addEdge(bluebranchline[i], bluebranchline[i+1],2); 
}

//Magenta 
magenta=require("./lines/magenta.json");
var magentaline = [];
for(var i=0; magenta[i]["25"]!='Botanical Garden'; i++)
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
    g.addEdge(magentaline[i], magentaline[i+1],4); 
}

//Yellow Line
yellow=require("./lines/yellow.json");
var yellowline = [];
for(var i=0; yellow[i]["Hindi"]!='HUDA City Centre'; i++)
{
  //SKIP INTERCHANGE
  
         yellowline[i]=yellow[i]["Hindi"];
}
for (var i = 0; i < yellowline.length; i++) { 
  if(yellowline[i]=='Hauz Khas' || yellowline[i]=='Rajiv Chowk')
   continue;
    else
    g.addNode(yellowline[i]); 
} 
for(var i=0; i<(yellowline.length-1); i++){
    g.addEdge(yellowline[i], yellowline[i+1],2); 
}


//Violet Line
violet=require("./lines/violet.json");
var violetline = [];
for(var i=0; violet[i]["Hindi"]!='Raja Nahar Singh (Ballabhgarh)'; i++)
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
    g.addEdge(violetline[i], violetline[i+1],2); 
}



//red Line
red=require("./lines/red.json");
var redline = [];
for(var i=0; red[i]["Hindi"]!='Rithala'; i++)
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
    g.addEdge(redline[i], redline[i+1],2); 
}







//
//INTERCHANGES
//

//Magenta-Blue
g.addEdge('Botanical Garden', 'Okhla Bird Sanctuary', 4);




//ShortestRouteCall
g.shortestRoute("Palam", "Azadpur");

//AdjList of Station
//g.printGraph("Kashmere Gate");


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