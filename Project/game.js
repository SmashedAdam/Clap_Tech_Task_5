const MAX_ROUND = 9;
const MAX_COL = 9;
const MAX_ROW = 2;
var d = null;
var determin = null;
var position = null;
var targetX = null;
var id = null;
var currentX = null;
var a = null;

class GameSession {
  constructor(safeLocation, currentXPos, currentYPos, dangerLocation, life) {
    this.safeLocation = [[], [], [], [], [], [], [], [], []]; // read as: col, row
    this.dangerLocation = [[], [], [], [], [], [], [], [], []]; // read as: col, row
    this.deadTile = [];
    this.openTile = [];
    this.validTile = [];
    this.life = null;
    this.diff = "easy";
    this.currentXPos = -1;
    this.currentYPos = -1;
  }

  resetEnv() {
    this.safeLocation = [[], [], [], [], [], [], [], [], []]; // read as: col, row
    this.dangerLocation = [[], [], [], [], [], [], [], [], []]; // read as: col, row
    this.deadTile = [];
    this.openTile = [];
    this.validTile = [];
    this.life = null;
    this.diff = "easy";
    this.currentXPos = -1;
    this.currentYPos = -1;
    for (var i = 0; i < 2; i++) {
      for (var o = 0; o < 9; o++) {
        id = i.toString() + o.toString();
        console.log(id);
        document.getElementById(id).src = "./img/glass.png";
      }
    }
  }

  newSession() {
    this.resetEnv();
    this.genSafeTile();
    this.validTile.push([0, 0]);
    this.validTile.push([1, 0]);
    this.diff = window.localStorage.getItem("diff");
    if (this.diff == "easy") {
      this.life = 7;
    } else if (this.diff == "normal") {
      this.life = 5;
    } else if (this.diff == "hard") {
      this.life = 3;
    } else if (this.diff == "hardcore") {
      this.life = 2;
    } else if (this.diff == "permadeath") {
      this.life = 1;
    }
    document.getElementById("diffDisplay").innerHTML = this.diff;
    document.getElementById("lifeDisplay").innerHTML = this.life;

    document.getElementById("00").src = "./img/valid.png";
    document.getElementById("10").src = "./img/valid.png";
  }

  genSafeTile() {
    // generate a safe tile list and a danger tile list
    for (var c = 0; c < MAX_COL; c++) {
      d = Math.floor(Math.random() * 2);
      if (d < 1) {
        this.safeLocation[c] = [c, 0];
        this.dangerLocation[c] = [c, 1]; // inverting the safeLocation result
      } else {
        this.safeLocation[c] = [c, 1];
        this.dangerLocation[c] = [c, 0]; // inverting the safeLocation result
      }
    }
    console.log(this.safeLocation); //debug only
    console.log(this.dangerLocation); //debug only
  }

  win() {
    console.log("Player won the game.");
    window.alert("You won!");
    location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ"); // Rick Roll LOL
  }

  stepForward(y, x) {
    if (x < this.currentXPos) {
      console.log("Not allowed to step backward");
    } else if (x > this.currentXPos + 1) {
      console.log("Not allowed to jump forward");
    } else {
      this.currentXPos = x;
      this.currentYPos = y;
      if (x == 8) {
        this.win();
      }
      this.validController();
    }
  }

  validController() {
    targetX = this.currentXPos + 1;
    currentX = this.currentXPos;
    this.validTile = [];
    for (var i = 0; i < 2; i++) {
      a = currentX + 1;
      id = i.toString() + a.toString();
      if (id == "09" || id == "19") {
        continue;
      } else {
        document.getElementById(id).src = "./img/valid.png";
      }
    }
    for (i = 0; i < 2; i++) {
      a = currentX;
      id = i.toString() + a.toString();
      document.getElementById(id).src = "./img/glass.png";
      a = currentX;
    }
  }
  // DEBUG ONLY
  logLists() {
    console.log("Debugging Data: ");
    console.log("Safe Locations: " + this.safeLocation);
    console.log("Danger Locations: " + this.dangerLocation);
    console.log("Current Location: " + this.currentXPos + this.currentYPos);
    console.log("dead tiles; " + this.deadTile);
    console.log("opened tiles: " + this.openTile);
    console.log("Valid Tiles: " + this.validTile);
    console.log("");
  }
}

//
// var play = new GameSession();
// play.genSafeTile();
//
