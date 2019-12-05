var express = require('express');
var app = express();
const functions = require('firebase-functions');

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

//GRAPH CLASS
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

  addEdgeSingle(node1, node2, weight, color) {
    this.adjacencyList[node1].push({ node: node2, weight: weight, line: color });
  }

  //Djikstra
  shortestRoute(startNode, endNode) {
    console.log("--Directions from " + startNode + " to " + endNode + "--\n");
    let times = {};
    var change = [];
    let backtrace = {};
    var foundS =0, foundD =0 ;
    let pq = new PriorityQueue();
    times[startNode] = 0;
    this.nodes.forEach(node => {
      if(node==startNode) {
        foundS=1
      }
      if(node==endNode) {
        foundD =1
      }
      if (node !== startNode) {
        times[node] = Infinity
      }
    });
    if(foundS == 0 && foundD ==0)
      return {'status' : 406}
    else if(foundS == 0){
      return {'status' : 4061}
    }
    else if(foundD == 0){
      return {'status' : 4062}
    }
    pq.enqueue([startNode, 0]);
    while (!pq.isEmpty()) {
      let shortestStep = pq.dequeue();
      let currentNode = shortestStep[0];
      this.adjacencyList[currentNode].forEach(neighbor => {
        let time = times[currentNode] + neighbor.weight;
        if (currentNode != startNode) {
          if (this.getline(currentNode, neighbor.node) != this.getline(currentNode, backtrace[currentNode])) {
            //Yamuna Bank Handler
            if (currentNode == 'Yamuna Bank' && neighbor.node == 'Indraprastha' && backtrace[currentNode] == 'Laxmi Nagar') {
              time = time + 0;
            }
            else if (currentNode == 'Yamuna Bank' && neighbor.node == 'Laxmi Nagar' && backtrace[currentNode] == 'Indraprastha') {
              time = time + 0;
            }
            //Dhaula Kuan - Durgabai Deshmukh South Campus Handler
            else if (this.getline(currentNode, neighbor.node) == "1.2km Skywalk" || this.getline(currentNode, backtrace[currentNode]) == "1.2km Skywalk")
              time = time + 0;
            //Noida Sector 51 - Noida Sector 52 Handler
            else if (this.getline(currentNode, neighbor.node) == "300m Walkway/Free e-Rickshaw" || this.getline(currentNode, backtrace[currentNode]) == "300m Walkway/Free e-Rickshaw")
              time = time + 0;
            //Ashok Park Main handler
            else if (currentNode == 'Ashok Park Main' && neighbor.node == 'Punjabi Bagh' && backtrace[currentNode] == 'Satguru Ram Singh Marg') {
              time = time + 0;
            }
            else if (currentNode == 'Ashok Park Main' && neighbor.node == 'Satguru Ram Singh Marg' && backtrace[currentNode] == 'Punjabi Bagh') {
              time = time + 0;
            }
            //Interchange Time Penalty
            else
              time = time + 9;
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

    //Class to send as result
    class all {
      constructor() {
        this.status = 204;
        this.line1 = [];
        this.line2 = [];
        this.interchange = [];
        this.lineEnds = [];
        this.path;
        this.time;
      }
    }
    var result = new all();
    while (lastStep !== startNode) {
      if (this.getline(lastStep, backtrace[lastStep]) != this.getline(backtrace[lastStep], backtrace[backtrace[lastStep]]))
        if (backtrace[lastStep] == startNode)
          ;
        //Yamuna Bank Handler
        else if (backtrace[lastStep] == 'Yamuna Bank' && lastStep == 'Indraprastha' && backtrace[backtrace[lastStep]] == 'Laxmi Nagar') {
          ;
        }
        else if (backtrace[lastStep] == 'Yamuna Bank' && lastStep == 'Laxmi Nagar' && backtrace[backtrace[lastStep]] == 'Indraprastha') {
          ;
        }
        //Ashok Park Main Handler
        else if (backtrace[lastStep] == 'Ashok Park Main' && lastStep == 'Punjabi Bagh' && backtrace[backtrace[lastStep]] == 'Satguru Ram Singh Marg') {
          ;
        }
        else if (backtrace[lastStep] == 'Ashok Park Main' && lastStep == 'Satguru Ram Singh Marg' && backtrace[backtrace[lastStep]] == 'Punjabi Bagh') {
          ;
        }
        else {
          var line1Send = this.getline(backtrace[lastStep], backtrace[backtrace[lastStep]]);
          var line2Send = this.getline(lastStep, backtrace[lastStep]);
          var interchangeSend = backtrace[lastStep];
          result.line1.unshift(line1Send);
          result.line2.unshift(line2Send);
          result.interchange.unshift(interchangeSend);
        }
      path.unshift(backtrace[lastStep])
      lastStep = backtrace[lastStep]
    }
    result.path = path;
    result.time = times[endNode];

    if (result.interchange.length == 0)
      result.line1[0] = this.getline(result.path[0], result.path[1]);
    result.lineEnds = getLast(result.path, result.interchange, result.line1, result.line2)
    console.log(result.time)

    if(path.length != 1)
      result.status = 200
    return result;
  }

  printGraph(sta) {
    console.log("--Adjacency List Of " + sta + "--")
    for (var i = 0; i < this.adjacencyList[sta].length; i++)
      console.log(this.adjacencyList[sta][i].line);
  }

  //Returns line between two adjacent stations
  getline(sta1, sta2) {
    var a = this.adjacencyList[sta1]
    var b = this.adjacencyList[sta2]
    if( a == undefined || b == undefined)
      return -2
    for (var i = 0; i < this.adjacencyList[sta1].length; i++) {
      if (this.adjacencyList[sta1][i].node == sta2)
        return (this.adjacencyList[sta1][i].line)
    }
    for (var j = 0; j < this.adjacencyList[sta2].length; j++) {
      if (this.adjacencyList[sta2][j].node == sta1)
        return (this.adjacencyList[sta2][j].line)
  }
  return -1
}
}

//Chooses station array based on input
function lineChoose(linein) {
  var line = []
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
  else if (linein == 'aqua')
    line = aqualine;
  else if (linein == 'grey')
    line = greyline;
  else if (linein == 'rapid')
    line = rapidline
  else if (linein == 'rapidloop')
    line = rapidloopline
  else
    line = 0;
  return line;
}

//Gets last station on line in direction of traversal
function getLast(path, interchange, line1, line2) {
  var line
  var linein
  var out = [];
  linein = line1[0]

  //Bluebranch at Yamuna Bank Handler
  if (linein == 'bluebranch' && interchange[0] == 'Yamuna Bank') {
    out.push('Dwarka Sector 21');
  }
  //Greenbranch at Ashok Park Main Handler
  else if (linein == 'greenbranch' && interchange[0] == 'Ashok Park Main') {
    out.push('Brigadier Hoshiyar Singh');
  }
  else if (linein == 'rapid') {
    var startLoop=1
    var endLoop=1
    
    for(var i=0; i<rapidline.length; i++){
      if(rapidline[i]==path[0]) {
        startLoop=0
      }
      if(rapidline[i]==path[path.length-1]) {
        endLoop=0
      }
    }
    console.log("S:" + startLoop + " E:" + endLoop)
    if(startLoop==1) {
      if(endLoop ==1) {
        out.push(getLastCalcStart(rapidloopline, path, interchange));
      }
      else
        out.push("Sector 55–56")
    }

    else if(startLoop==0 && endLoop ==1) {
      out.push("Phase 3")
    }
    else {
      line = lineChoose(linein)
    out.push(getLastCalcStart(line, path, interchange));
    }

  }

  else {
    line = lineChoose(linein)
    out.push(getLastCalcStart(line, path, interchange));
  }
  if (line2.length == 0)
    return out
  for (var i = 0; i < (line2.length); i++) {
    linein = line2[i]

    line = lineChoose(linein)
    out.push(getLastCalc(line, path, interchange[i], interchange[i + 1]))
  }
  return out
}

//Last station calculator first line
function getLastCalcStart(line, path, interchange) {
  var startPos = 1000
  var endPos = 1000
  if (line == 0)
    return 0
  for (var i = 0; i <= line.length; i++) {
    //startpos
    if (line[i] == path[0])
      startPos = i;
    //endpos
    if (interchange.length == 0) {
      if (line[i] == path[path.length - 1])
        endPos = i
    }
    else if (line[i] == interchange[0])
      endPos = i;
  }
  console.log("start:" + startPos + " end:" + endPos)
  return comparePos(startPos, endPos, line)
}

//Last station calculator for all lines except first
function getLastCalc(line, path, interchange, nextInterchange) {
  var startPos = 1000
  var endPos = 1000
  if (line == 0)
    return 0
  for (var j = 0; j <= line.length; j++) {
    //startpos
    if (line[j] == interchange)
      startPos = j;
    //endpos
    if (nextInterchange == undefined) {
      if (line[j] == path[path.length - 1])
        endPos = j;
    }
    else if (line[j] == nextInterchange) {
      endPos = j;
    }
  }
  return comparePos(startPos, endPos, line)
}

//Returns station based on comparisons
function comparePos(startPos, endPos, line) {
  //Out of line start handler
  if (startPos == 1000) {
    if (line == blueline)
      return 'Dwarka Sector 21'
    else if (line == bluebranchline)
      return 'Vaishali'
    else if (line == greenline)
    return 'Brigadier Hoshiyar Singh'
  else if (line == greenbranchline)
    return 'Kirti Nagar'
  }
  //Out of line end handler
  if (endPos == 1000) {
    if (line == blueline)
      return 'Vaishali';
    else if (line == bluebranchline)
      return 'Dwarka Sector 21'
      else if (line == greenline)
    return 'Kirti Nagar'
  else if (line == greenbranchline)
    return 'Brigadier Hoshiyar Singh'
  }
  if (endPos < startPos) {
    if(line == bluebranchline)
        return 'Dwarka Sector 21'
      if(line == greenbranchline)
        return 'Brigadier Hoshiyar Singh'
    return line[0]
  }
  else
    return line[line.length - 1];

}


var lines = [
  "blue",
  "bluebranch",
  "magenta",
  "yellow",
  "violet",
  "red",
  "green",
  "greenbranch",
  "pink",
  "pinkbranch",
  "orange",
  "aqua",
  "grey",
  "rapid",
  "rapidloop"
]

for(var i = 0; i<lines.length; i++)
{
  eval("var "  + lines[i] + "line=[]")
}



//Imports station details from JSON to line arrays
function importlines() {
  //
  //METRO LINES
  //



  //Blue Line


  blue = require("./lines/blue.json");

  for (var i = 0; i < blue.length; i++) {
    blueline[i] = blue[i]["Hindi"].toLowerCase();
  }

  for (var i = 0; i < blueline.length; i++) {
    g.addNode(blueline[i]);
  }

  for (var i = 0; i < (blueline.length - 1); i++) {
    g.addEdge(blueline[i], blueline[i + 1], 2.02, "blue");
  }



  //BlueBranch
  bluebranch = require("./lines/bluebranch.json");

  for (var i = 0; i < bluebranch.length; i++) {

    bluebranchline[i] = bluebranch[i]["Hindi"].toLowerCase();
  }
  for (var i = 0; i < bluebranchline.length; i++) {
    //Skip Interchange
    if (bluebranchline[i] == 'yamuna bank')
      continue;
    else
      g.addNode(bluebranchline[i]);
  }

  for (var i = 0; i < (bluebranchline.length - 1); i++) {
    g.addEdge(bluebranchline[i], bluebranchline[i + 1], 1.875, "bluebranch");
  }

  //Magenta 
  magenta = require("./lines/magenta.json");

  for (var i = 0; i < magenta.length; i++) {
    magentaline[i] = magenta[i]["25"].toLowerCase();
  }
  for (var i = 0; i < magentaline.length; i++) {
    //Skip Interchange
    if (magentaline[i] == 'janakpuri west')
      continue;
    if (magentaline[i] == 'botanical garden')
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
    yellowline[i] = yellow[i]["Hindi"].toLowerCase();
  }
  for (var i = 0; i < yellowline.length; i++) {
    if (yellowline[i] == 'hauz khas' || yellowline[i] == 'rajiv chowk')
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

    violetline[i] = violet[i]["Hindi"].toLowerCase();
  }
  for (var i = 0; i < violetline.length; i++) {
    if (violetline[i] == 'kashmere gate' || violetline[i] == 'mandi house' || violetline[i] == 'central secretariat' || violetline[i] == 'kalkaji mandir')
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

    redline[i] = red[i]["Hindi"].toLowerCase();
  }
  for (var i = 0; i < redline.length; i++) {
    if (redline[i] == 'kashmere gate')
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
    greenline[i] = green[i]["Hindi"].toLowerCase();
  }
  for (var i = 0; i < greenline.length; i++) {
    if (greenline[i] == 'inderlok')
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
    greenbranchline[i] = greenbranch[i]["Hindi"].toLowerCase();
  }
  for (var i = 0; i < greenbranchline.length; i++) {
    if (greenbranchline[i] == 'kirti nagar' || greenbranchline[i] == 'ashok park main')
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
    pinkline[i] = pink[i]["Hindi"].toLowerCase();
  }
  for (var i = 0; i < pinkline.length; i++) {
    if (pinkline[i] == 'azadpur' || pinkline[i] == 'netaji subhash place' || pinkline[i] == 'rajouri garden' || pinkline[i] == 'ina' || pinkline[i] == 'lajpat nagar' || pinkline[i] == 'mayur vihar – i')
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
    pinkbranchline[i] = pinkbranch[i]["Hindi"].toLowerCase();
  }
  for (var i = 0; i < pinkbranchline.length; i++) {
    if (pinkbranchline[i] == 'anand vihar' || pinkbranchline[i] == 'karkarduma' || pinkbranchline[i] == 'welcome')
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
    orangeline[i] = orange[i]["Hindi"].toLowerCase();
  }
  for (var i = 0; i < orangeline.length; i++) {
    if (orangeline[i] == 'new delhi' || orangeline[i] == 'dwarka sector 21')
      continue;
    else
      g.addNode(orangeline[i]);
  }
  for (var i = 0; i < (orangeline.length - 1); i++) {
    g.addEdge(orangeline[i], orangeline[i + 1], 5.2, "orange");
  }

  




  //Aqua Line

  aqua = require("./lines/aqua.json");

  for (var i = 0; i < aqua.length; i++) {
    aqualine[i] = aqua[i]["Hindi"].toLowerCase();
  }

  for (var i = 0; i < aqualine.length; i++) {
    g.addNode(aqualine[i]);
  }

  for (var i = 0; i < (aqualine.length - 1); i++) {
    g.addEdge(aqualine[i], aqualine[i + 1], 2.86, "aqua");
  }



  //Grey Line

  grey = require("./lines/grey.json");

  for (var i = 0; i < grey.length; i++) {
    greyline[i] = grey[i]["2"].toLowerCase();
  }


  for (var i = 0; i < greyline.length; i++) {
    if (greyline[i] == 'dwarka')
      continue;
    else
    g.addNode(greyline[i]);
  }

  for (var i = 0; i < (greyline.length - 1); i++) {
    g.addEdge(greyline[i], greyline[i + 1], 2.10, "grey");
  }

  //rapid
  rapid = require("./lines/rapid.json");

  for (var i = 0; i < rapid.length; i++) {
    rapidline[i] = rapid[i]["Hindi"].toLowerCase();
  }
  for (var i = 0; i < rapidline.length; i++) {
    if (rapidline[i] == 'sikandarpur')
      continue;
    else
      g.addNode(rapidline[i]);
  }
  for (var i = 0; i < (rapidline.length - 1); i++) {
    g.addEdge(rapidline[i], rapidline[i + 1], 5.2, "rapid");
  }

  //rapidloop
  rapidloop = require("./lines/rapidloop.json");
  for (var i = 0; i < rapidloop.length; i++) {
    rapidloopline[i] = rapidloop[i]["Hindi"].toLowerCase();
  }
  for (var i = 0; i < rapidloopline.length; i++) {
      g.addNode(rapidloopline[i]);
  }



  for (var i = 0; i < (rapidloopline.length - 1); i++) {
    g.addEdgeSingle(rapidloopline[i], rapidloopline[i + 1], 5.2, "rapid");
  }

  
  //Dhaula Kuan - South Campus Connection
  g.addEdge("dhaula kuan", "durgabai deshmukh south campus", 18, "1.2km Skywalk");

  //Noida Sec 52 - Noida Sec 51
  g.addEdge("noida sector 52", "noida sector 51", 12, "300m Walkway/Free e-Rickshaw");

  //Aqua Line Looper

  g.addEdgeSingle("phase 3", "phase 2", 5.2, "rapid");
  g.addEdgeSingle("phase 2", "vodafone belvedere towers", 5.2, "rapid");


}


//Create new graph
let g = new Graph();
//Import lines
importlines();


//Firebase function exporter
exports.get = functions.https.onRequest((req, res) => {
  if(req.query.to == undefined || req.query.from == undefined) {
    res.send({'status' : '400'})
    console.log("Invalid params")
  }
  else {
  let to = req.query.to.toLowerCase()
  let from = req.query.from.toLowerCase()
  result = g.shortestRoute(from, to);
  res.send(result)
  }
})




//ShortestRouteCall
//console.log(g.shortestRoute("Palam", "Model Town").interchange);

//AdjList of Station
//g.printGraph("Rajouri Garden");

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
//Orange
//Aqua
//Grey