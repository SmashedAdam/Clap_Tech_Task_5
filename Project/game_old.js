const MAX_ROUND = 9;
const columns = 9;
const rows = 2;
var d = null;
var determin = null;
var position = null;
var targetX = null;
var targetY = null;
var id = null;
var currentX = null;
var a = null;
var lastX = null;
var lastY = null;
var lose = "no";

class GameSession {
  constructor(
    safeLocation,
    currentXPos,
    currentYPos,
    dangerLocation,
    life,
    maxLife
  ) {
    this.safeLocation = [[], [], [], [], [], [], [], [], []]; // read as: col, row
    this.dangerLocation = [[], [], [], [], [], [], [], [], []]; // read as: col, row
    this.deadTile = [];
    this.life = null;
    this.maxLife = null;
    this.diff = "easy";
    this.currentXPos = -1;
    this.currentYPos = -1;
  }

  newSession() {
    this.resetEnv();
    this.genSafeTile();
    this.diff = window.sessionStorage.getItem("diff");
    if (this.diff == "easy") {
      this.life = 7;
      this.maxLife = 7;
      document.getElementById("diffDisplay").innerHTML = "簡單";
    } else if (this.diff == "normal") {
      this.life = 5;
      this.maxLife = 5;
      document.getElementById("diffDisplay").innerHTML = "一般";
    } else if (this.diff == "hard") {
      this.life = 3;
      this.maxLife = 3;
      document.getElementById("diffDisplay").innerHTML = "困難";
    } else if (this.diff == "hardcore") {
      this.life = 2;
      this.maxLife = 2;
      document.getElementById("diffDisplay").innerHTML = "噩夢";
    } else if (this.diff == "permadeath") {
      this.life = 1;
      this.maxLife = 1;
      document.getElementById("diffDisplay").innerHTML = "永久死亡";
    }
    document.getElementById("lifeDisplay").innerHTML = this.life;
    this.viewControl();
    document.getElementById("00").src = "./img/valid.png";
    document.getElementById("10").src = "./img/valid.png";
  }

  resetEnv() {
    this.safeLocation = [[], [], [], [], [], [], [], [], []]; // read as: col, row
    this.dangerLocation = [[], [], [], [], [], [], [], [], []]; // read as: col, row
    this.deadTile = [];
    this.life = null;
    this.diff = "easy";
    this.currentXPos = -1;
    this.currentYPos = -1;
    for (var i = 0; i < 2; i++) {
      for (var o = 0; o < 9; o++) {
        id = i.toString() + o.toString();
        document.getElementById(id).src = "./img/glass.png";
      }
    }
  }

  viewControl() {
    document.getElementById("lifeDisplay").innerHTML = this.life;
    // Life indicator
    if (this.life / this.maxLife > 2 / 3) {
      document.getElementById("playerStatus").style.border =
        "8px solid #57ffb1";
    } else if (this.life / this.maxLife > 1 / 3) {
      document.getElementById("playerStatus").style.border =
        "8px solid #fef56d";
    } else if (this.life / this.maxLife < 1 / 3) {
      document.getElementById("playerStatus").style.border =
        "8px solid #ff6868";
    }
    // Difficulty Level indicator
    if (this.diff == "easy") {
      document.getElementById("diffStatus").style.border = "8px solid #57ffb1";
    } else if (this.diff == "normal") {
      document.getElementById("diffStatus").style.border = "8px solid #fef56d";
    } else if (this.diff == "hard") {
      document.getElementById("diffStatus").style.border = "8px solid #ff6868";
    } else if (this.diff == "hardcore") {
      document.getElementById("diffStatus").style.border = "8px solid #8a2be2";
    } else if (this.diff == "permadeath") {
      document.getElementById("diffStatus").style.border = "8px solid #ee82ee";
    }
  }

  genSafeTile() {
    // generate a safe tile list and a danger tile list
    for (var c = 0; c < columns; c++) {
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
    window.alert("Receive your prize!");
    window.open("https://www.youtube.com/watch?v=xvFZjo5PgG0").focus(); // Rick Roll LOL
  }
  lose() {
    console.log("Player lose the game.");
    window.alert("You lost!");
    window.alert("Receive your punishment now!");
    window.open("https://www.youtube.com/watch?v=xvFZjo5PgG0").focus(); // The same LOL
    lose = "yes";
  }

  stepForward(y, x) {
    if (lose == "yes") {
    } else {
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
        this.validController(); // render valid glass
        this.playerTP(); // render player position
        this.deadRender();
        this.deadControl(y, x); // detect is the player dead or not, then render it
      }
    }
  }

  // Game mechanism
  // render all valid tiles, then restore old tiles into glass
  validController() {
    targetX = this.currentXPos + 1;
    currentX = this.currentXPos;
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
  // This method control where the player icon should render, then turn old tile back to glass
  playerTP() {
    targetX = this.currentXPos;
    targetY = this.currentYPos;
    id = targetY.toString() + targetX.toString();
    document.getElementById(id).src = "./img/player.png";
    if (lastX == null || lastY == null) {
    } else {
      id = lastY.toString() + lastX.toString();
      document.getElementById(id).src = "./img/glass.png";
    }
    lastY = this.currentYPos;
    lastX = this.currentXPos;
  }
  // check is the player dead, then do a render job
  deadControl(y, x) {
    for (var c = 0; c < this.dangerLocation.length; c++) {
      var data = this.dangerLocation[c];
      if (x == data[0]) {
        if (y == data[1]) {
          this.life = this.life - 1;

          console.log("Player is dead");
          var temp = [x, y];
          this.deadTile.push(temp);
          console.log(this.deadTile.length);
          this.viewControl();
          if (this.life < 1) {
            this.lose();
          }
          this.backToStart();
          document.getElementById("00").src = "./img/valid.png";
          document.getElementById("10").src = "./img/valid.png";
          this.deadRender();
        }
      }
    }
  }

  deadRender() {
    for (var ite = 0; ite < this.deadTile.length; ite++) {
      var block = this.deadTile[ite];
      for (var posi = 0; posi < 2; posi++) {
        var deadX = block[0];
        var deadY = block[1];
        id = deadY.toString() + deadX.toString();
        document.getElementById(id).src = "./img/broken.png";
      }
    }
  }
  // DEBUG ONLY
  logLists() {
    console.log("Debugging Data: ");
    console.log("Safe Locations: " + this.safeLocation);
    console.log("Danger Locations: " + this.dangerLocation);
    console.log("Current Location: " + this.currentXPos + this.currentYPos);
    console.log("dead tiles: " + this.deadTile);
    console.log("opened tiles: " + this.openTile);
    console.log("Valid Tiles: " + this.validTile);
    console.log("");
  }
}

//
// var play = new GameSession();
// play.genSafeTile();
//
