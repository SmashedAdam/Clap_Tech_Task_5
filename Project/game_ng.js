const columns = 8;
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
var stop = "no";

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
    this.openLocation = [];
    this.deadTile = [];
    this.life = null;
    this.maxLife = null;
    this.diff = "easy";
    this.currentXPos = -1;
    this.currentYPos = -1;
    this.Beast = "No";
    this.cheat = sessionStorage.getItem("cheatCode");
  }

  // Environment controlling

  newSession() {
    // Creating a new game session
    this.resetEnv();
    this.genSafeTile();
    stop = "no";
    this.diff = window.sessionStorage.getItem("diff");
    if (this.diff == null) {
      this.diff = "easy"
      this.currentXPos = -2;
      this.currentYPos = -2;
    }
    this.Beast = window.sessionStorage.getItem("Beast");
    // This part is determining how many life counts the player should have
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
    // calling viewControl() here, giving the life bar and difficulty bar a color frame
    this.viewControl();
    // render two start tiles with valid
    document.getElementById("00").src = "./img/valid.png";
    document.getElementById("10").src = "./img/valid.png";
  }

  genSafeTile() {
    // Generate a 2d list to store safe tiles, and invert it into a danger list
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

  resetEnv() {
    // reseting the game into the start state, and erase all tiles data.
    this.safeLocation = [[], [], [], [], [], [], [], []]; // read as: col, row
    this.dangerLocation = [[], [], [], [], [], [], [], []]; // read as: col, row
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

  // Display controlling & games
  viewControl() {
    // a controller that control the color of life bar and difficulty bar
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
  // This method can control where the player can step, then render all valid tiles with correct image.
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
      if (document.getElementById(id).src == "./img/player.png") {
      } else {
        id = lastY.toString() + lastX.toString();
        document.getElementById(id).src = "./img/open.png";
        var temp = [lastX, lastY];
        this.openLocation.push(temp);
      }
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
          if (this.cheat == "yes") {
          } else {
            this.life = this.life - 1;
          }

          window.alert("Player is dead");
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

  // openRender() {
  //   for (var ite = 0; ite < this.openLocation.length; ite++) {
  //     var block = this.openLocation[ite];
  //     for (var posi = 0; posi < 2; posi++) {
  //       var openX = block[0];
  //       var openY = block[1];
  //       id = openY.toString() + openX.toString();
  //       document.getElementById(id).src = "./img/open.png";
  //     }
  //   }
  // }

  backToStart() {
    // this method can reset the view, but not erasing any data
    this.currentXPos = -1;
    this.currentYPos = -1;
    for (var i = 0; i < 2; i++) {
      for (var o = 0; o < 9; o++) {
        id = i.toString() + o.toString();
        document.getElementById(id).src = "./img/glass.png";
      }
    }
  }
  stepForward(y, x) {
    if (stop == "yes") {
    } else {
      if (x < this.currentXPos) {
        console.log("Not allowed to step backward");
      } else if (x > this.currentXPos + 1) {
        console.log("Not allowed to jump forward");
      } else if (x == this.currentXPos) {
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
  // Win & Lose
  // These codes are very simple. It will rick roll the player when they win or lose
  win() {
    console.log("Player won the game.");
    window.alert("You won!");
    if (this.Beast == "No") {
    } else {
      window.alert("Receive your prize!");
      window.open("https://www.youtube.com/watch?v=xvFZjo5PgG0").focus();
    } // Rick Roll LOL
  }
  lose() {
    console.log("Player lose the game.");
    window.alert("You lost!");
    if (this.Beast == "No") {
    } else {
      window.alert("Receive your punishment now!");
      window.open("https://www.youtube.com/watch?v=xvFZjo5PgG0").focus();
    } // The same LOL
    stop = "yes";
  }

  // DEBUG controlling
  // logLists() {
  //   console.log("Debugging Data: ");
  //   console.log("Safe Locations: " + this.safeLocation);
  //   console.log("Danger Locations: " + this.dangerLocation);
  //   console.log("Current Location: " + this.currentXPos + this.currentYPos);
  //   console.log("dead tiles: " + this.deadTile);
  //   console.log("opened tiles: " + this.openTile);
  //   console.log("Valid Tiles: " + this.validTile);
  //   console.log("");
  // }
}
