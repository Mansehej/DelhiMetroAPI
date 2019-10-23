var express = require('express');
var app = express();
//QUEUE CLASS
class PriorityQueue {
  constructor() {
    this.collection = [];
  }
  enqueue(element) {
    if (this.isEmpty()) {
      this.collection.push(element);
    } else {
      let added = false;
      for (let i = 1; i <= this.collection.length; i++) {
        if (element[1] < this.collection[i - 1][1]) {
          this.collection.splice(i - 1, 0, element);
          added = true;
          break;
        }
      }
      if (!added) {
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
    this.adjacencyList[node1].push({ node: node2, weight: weight, line: color });
    this.adjacencyList[node2].push({ node: node1, weight: weight, line: color });
  }

  //Djikstra
  shortestRoute(startNode, endNode) {
    console.log("--Directions from " + startNode + " to " + endNode + "--\n");
    let times = {};
    var change = [];
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
        if (currentNode != startNode) {
          if (this.getline(currentNode, neighbor.node) != this.getline(currentNode, backtrace[currentNode])) {
            if (this.getline(currentNode, neighbor.node) == "1.2km Skywalk" || this.getline(currentNode, backtrace[currentNode]) == "1.2km Skywalk")
              time = time + 0;
            else
              time = time + 13;
          }
        }

        if (time < times[neighbor.node]) {
          times[neighbor.node] = time;
          backtrace[neighbor.node] = currentNode;
          pq.enqueue([neighbor.node, time]);
        }
      });
    }
    let path = [endNode];
    let lastStep = endNode;

    class all {
      constructor() {
        this.line1 = [];
        this.line2 = [];
        this.interchange = [];
        this.lineEnds = [];
        this.path;
        this.time;
      }
    }
    var result = new all();
    var count = 0;
    while (lastStep !== startNode) {
      if (this.getline(lastStep, backtrace[lastStep]) != this.getline(backtrace[lastStep], backtrace[backtrace[lastStep]]))
        if (backtrace[lastStep] == startNode)
          ;
        else {
          result.line1.unshift(this.getline(backtrace[lastStep], backtrace[backtrace[lastStep]]));
          result.line2.unshift(this.getline(lastStep, backtrace[lastStep]))
          result.interchange.unshift(backtrace[lastStep]);
          count++;
        }
      console.log(result.interchange);
      path.unshift(backtrace[lastStep])
      lastStep = backtrace[lastStep]
    }
    result.path = path;
    result.time = times[endNode];

    if (result.interchange.length == 0)
      result.line1[0] = this.getline(result.path[0], result.path[1]);
    result.lineEnds = getLast(result.path, result.interchange, result.line1, result.line2)
    return result;

  }

  printGraph(sta) {
    console.log("--Adjacency List Of " + sta + "--")
    for (var i = 0; i < this.adjacencyList[sta].length; i++)
      console.log(this.adjacencyList[sta][i].line);
  }

  getline(sta1, sta2) {
    for (var i = 0; i < this.adjacencyList[sta1].length; i++) {
      if (this.adjacencyList[sta1][i].node == sta2)
        return (this.adjacencyList[sta1][i].line);
    }
  }

}


function lineChoose(linein) {
  if (linein == 'blue')
    line = blueline;
  else if (linein == 'bluebranch')
    line = bluebranchline;
  else if (linein == 'magenta')
    line = magentaline;
  else if (linein == 'yellow')
    line = yellowline;
  else if (linein == 'violet')
    line = violetline;
  else if (linein == 'red')
    line = redline;
  else if (linein == 'green')
    line = greenline;
  else if (linein == 'greenbranch')
    line = greenbranchline;
  else if (linein == 'pink')
    line = pinkline;
  else if (linein == 'pinkbranch')
    line = pinkbranchline;
  else if (linein == 'orange')
    line = orangeline;
  return line;
}

function getLast(path, interchange, line1, line2) {

  var line
  var linein
  var out = [];
  linein = line1[0]
  line = lineChoose(linein)
  out.push(getLastCalcStart(line, path, interchange));
  for (var i = 0; i < (line2.length); i++) {
    linein = line2[i]
    line = lineChoose(linein)
    out.push(getLastCalc(line, path, interchange[i], interchange[i + 1]))
  }
  return out
 }



function getLastCalc(line, path, interchange, nextInterchange) {
  var startPos = 1000
  var endPos = 1000

  for (var j = 0; j <= line.length; j++) {
    if (line[j] == interchange)
      startPos = j;
    if (nextInterchange == undefined) {
      if (line[j] == path[path.length])
        endPos = j;
    }
    else if (line[j] == nextInterchange) {
          endPos = j;
    }
  }
  if (endPos < startPos)
    return line[0]
  else
    return line[line.length - 1];
}



function getLastCalcStart(line, path, interchange) {
  for (var i = 0; i <= line.length; i++) {
    if (line[i] == path[0])
      startPos = i;
    if (line[i] == interchange[0])
      endPos = i;
  }
  if (endPos < startPos)
    return line[0]
  else
    return line[line.length - 1];
}

let g = new Graph();

app.get('/route', (req, res) => {
  let to = req.query.to
  let from = req.query.from
  result = g.shortestRoute(from, to);
  console.log(result)

  res.send(result)
})


var blueline = [];
var bluebranchline = [];
var magentaline = [];
var yellowline = [];
var violetline = [];
var redline = [];
var greenline = [];
var greenbranchline = [];
var pinkline = [];
var pinkbranchline = [];
var orangeline = [];


function importlines() {
  //
  //METRO LINES
  //



  //Blue Line

  blue = require("./lines/blue.json");

  for (var i = 0; i < 50; i++) {
    blueline[i] = blue[i]["Hindi"];
  }

  for (var i = 0; i < blueline.length; i++) {
    g.addNode(blueline[i]);
  }

  for (var i = 0; i < 49; i++) {
    g.addEdge(blueline[i], blueline[i + 1], 2.02, "blue");
  }



  //BlueBranch
  bluebranch = require("./lines/bluebranch.json");

  for (var i = 0; i < 11; i++) {

    bluebranchline[i] = bluebranch[i]["Hindi"];
  }

  for (var i = 0; i < bluebranchline.length; i++) {
    //Skip Interchange
    if (bluebranchline[i] == 'Yamuna Bank')
      continue;
    else
      g.addNode(bluebranchline[i]);
  }

  for (var i = 0; i < 10; i++) {
    g.addEdge(bluebranchline[i], bluebranchline[i + 1], 1.875, "bluebranch");
  }

  //Magenta 
  magenta = require("./lines/magenta.json");

  for (var i = 0; i < magenta.length; i++) {
    magentaline[i] = magenta[i]["25"];
  }
  for (var i = 0; i < magentaline.length; i++) {
    //Skip Interchange
    if (magentaline[i] == 'Janakpuri West')
      continue;
    if (magentaline[i] == 'Botanical Garden')
      continue;
    else
      g.addNode(magentaline[i]);
  }
  for (var i = 0; i < (magentaline.length - 1); i++) {
    g.addEdge(magentaline[i], magentaline[i + 1], 2.36, "magenta");
  }

  //Yellow Line
  yellow = require("./lines/yellow.json");

  for (var i = 0; i < yellow.length; i++) {
    yellowline[i] = yellow[i]["Hindi"];
  }
  for (var i = 0; i < yellowline.length; i++) {
    if (yellowline[i] == 'Hauz Khas' || yellowline[i] == 'Rajiv Chowk')
      continue;
    else
      g.addNode(yellowline[i]);
  }
  for (var i = 0; i < (yellowline.length - 1); i++) {
    g.addEdge(yellowline[i], yellowline[i + 1], 2.22, "yellow");
  }


  //Violet Line
  violet = require("./lines/violet.json");

  for (var i = 0; i < violet.length; i++) {

    violetline[i] = violet[i]["Hindi"];
  }
  for (var i = 0; i < violetline.length; i++) {
    if (violetline[i] == 'Kashmere Gate' || violetline[i] == 'Mandi House' || violetline[i] == 'Central Secretariat' || violetline[i] == 'Kalkaji Mandir')
      continue;
    else
      g.addNode(violetline[i]);
  }
  for (var i = 0; i < (violetline.length - 1); i++) {
    g.addEdge(violetline[i], violetline[i + 1], 2.24, "violet");
  }



  //red Line
  red = require("./lines/red.json");

  for (var i = 0; i < red.length; i++) {

    redline[i] = red[i]["Hindi"];
  }
  for (var i = 0; i < redline.length; i++) {
    if (redline[i] == 'Kashmere Gate')
      continue;
    else
      g.addNode(redline[i]);
  }
  for (var i = 0; i < (redline.length - 1); i++) {
    g.addEdge(redline[i], redline[i + 1], 2.03, "red");
  }



  //green Line
  green = require("./lines/green.json");

  for (var i = 0; i < green.length; i++) {
    greenline[i] = green[i]["Hindi"];
  }
  for (var i = 0; i < greenline.length; i++) {
    if (greenline[i] == 'Inderlok')
      continue;
    else
      g.addNode(greenline[i]);
  }
  for (var i = 0; i < (greenline.length - 1); i++) {
    g.addEdge(greenline[i], greenline[i + 1], 2.49, "green");
  }


  //greenbranch Line
  greenbranch = require("./lines/greenbranch.json");

  for (var i = 0; i < greenbranch.length; i++) {
    greenbranchline[i] = greenbranch[i]["Hindi"];
  }
  for (var i = 0; i < greenbranchline.length; i++) {
    if (greenbranchline[i] == 'Kirti Nagar' || greenbranchline[i] == 'Ashok Park Main')
      continue;
    else
      g.addNode(greenbranchline[i]);
  }
  for (var i = 0; i < (greenbranchline.length - 1); i++) {
    g.addEdge(greenbranchline[i], greenbranchline[i + 1], 1.33, "greenbranch");
  }

  //pink Line
  pink = require("./lines/pink.json");

  for (var i = 0; i < pink.length; i++) {
    pinkline[i] = pink[i]["Hindi"];
  }
  for (var i = 0; i < pinkline.length; i++) {
    if (pinkline[i] == 'Azadpur' || pinkline[i] == 'Netaji Subhash Place' || pinkline[i] == 'Rajouri Garden' || pinkline[i] == 'INA' || pinkline[i] == 'Lajpat Nagar' || pinkline[i] == 'Mayur Vihar – I')
      continue;
    else
      g.addNode(pinkline[i]);
  }
  for (var i = 0; i < (pinkline.length - 1); i++) {
    g.addEdge(pinkline[i], pinkline[i + 1], 2.69, "pink");
  }

  //pinkbranch Line
  pinkbranch = require("./lines/pinkbranch.json");

  for (var i = 0; i < pinkbranch.length; i++) {
    pinkbranchline[i] = pinkbranch[i]["Hindi"];
  }
  for (var i = 0; i < pinkbranchline.length; i++) {
    if (pinkbranchline[i] == 'Anand Vihar' || pinkbranchline[i] == 'Karkarduma' || pinkbranchline[i] == 'Welcome')
      continue;
    else
      g.addNode(pinkbranchline[i]);
  }
  for (var i = 0; i < (pinkbranchline.length - 1); i++) {
    g.addEdge(pinkbranchline[i], pinkbranchline[i + 1], 2.43, "pinkbranch");
  }

  //Orange
  orange = require("./lines/orange.json");

  for (var i = 0; i < orange.length; i++) {
    orangeline[i] = orange[i]["Hindi"];
  }
  for (var i = 0; i < orangeline.length; i++) {
    if (orangeline[i] == 'New Delhi' || orangeline[i] == 'Dwarka Sector 21')
      continue;
    else
      g.addNode(orangeline[i]);
  }
  for (var i = 0; i < (orangeline.length - 1); i++) {
    g.addEdge(orangeline[i], orangeline[i + 1], 5.2, "orange");
  }

  //Dhaula Kuan - South Campus Connection
  g.addEdge("Dhaula Kuan", "Durgabai Deshmukh South Campus", 18, "1.2km Skywalk");

}

importlines();


app.get('/route',(req,res)=>{
  let to= req.query.to
  let from=  req.query.from
  result=g.shortestRoute(from,to);
  console.log(result)
  res.send(result)
})

//ShortestRouteCall
//console.log(g.shortestRoute("Palam", "Model Town").interchange);

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