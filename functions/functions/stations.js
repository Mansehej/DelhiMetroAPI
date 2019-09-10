var express = require('express')
var app = express()
const functions = require('firebase-functions')



//Declare metro line arrays globally
var blueline = []
var bluebranchline = []
var magentaline = []
var yellowline = []
var violetline = []
var redline = []
var greenline = []
var greenbranchline = []
var pinkline = []
var pinkbranchline = []
var orangeline = []
var aqualine = []

function importlines() {
    //
    //METRO LINES
    //
  

  
    //Blue Line
  
    blue = require("./lines/blue.json");
    for (var i = 0; i < blue.length; i++) {
      blueline[i] = blue[i]["Hindi"];
    }
  
    //BlueBranch
    bluebranch = require("./lines/bluebranch.json");
    for (var i = 0; i < bluebranch.length; i++) {
      bluebranchline[i] = bluebranch[i]["Hindi"];
    }
   
    //Magenta 
    magenta = require("./lines/magenta.json");
    for (var i = 0; i < magenta.length; i++) {
      magentaline[i] = magenta[i]["25"];
    }
   
    //Yellow Line
    yellow = require("./lines/yellow.json");
    for (var i = 0; i < yellow.length; i++) {
      yellowline[i] = yellow[i]["Hindi"];
    }
  
  
    //Violet Line
    violet = require("./lines/violet.json");
    for (var i = 0; i < violet.length; i++) {
      violetline[i] = violet[i]["Hindi"];
    }
    
    //red Line
    red = require("./lines/red.json");
    for (var i = 0; i < red.length; i++) {
      redline[i] = red[i]["Hindi"];
    }
  
    //green Line
    green = require("./lines/green.json");
  
    for (var i = 0; i < green.length; i++) {
      greenline[i] = green[i]["Hindi"];
    }
   
    //greenbranch Line
    greenbranch = require("./lines/greenbranch.json");
    for (var i = 0; i < greenbranch.length; i++) {
      greenbranchline[i] = greenbranch[i]["Hindi"];
    }
    
    //pink Line
    pink = require("./lines/pink.json");
    for (var i = 0; i < pink.length; i++) {
      pinkline[i] = pink[i]["Hindi"];
    }
    
    //pinkbranch Line
    pinkbranch = require("./lines/pinkbranch.json");
    for (var i = 0; i < pinkbranch.length; i++) {
      pinkbranchline[i] = pinkbranch[i]["Hindi"];
    }
   
    //Orange
    orange = require("./lines/orange.json");
    for (var i = 0; i < orange.length; i++) {
      orangeline[i] = orange[i]["Hindi"];
    }
  

    //Aqua Line
    aqua = require("./lines/aqua.json");
    for (var i = 0; i < aqua.length; i++) {
      aqualine[i] = aqua[i]["Hindi"];
    }

}

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
  else
    line = 0;
  return line;
}

function stationList(value) {
    var linereq = lineChoose(value)
    return linereq
}

importlines()

exports.get = functions.https.onRequest((req, res) => {
    console.log("inside station")
    let value = req.query.value
    result = stationList(value)
    res.send(result)
})

