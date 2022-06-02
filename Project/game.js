const MAX_ROUND = 9;
const MAX_COL = 9;
const MAX_ROW = 2;
var d = null;
var determin = null;
var position = null;

class GameSession {
  constructor(safeLocation, currentXPos, currentYPos, dangerLocation, life) {
    this.safeLocation = [[], [], [], [], [], [], [], [], []]; // read as: col, row
    this.dangerLocation = [[], [], [], [], [], [], [], [], []]; // read as: col, row
    this.deadTile = [];
    this.openTile = [];
    this.validTile = [];
    this.life = null;

    this.currentXPos = null;
    this.currentYPos = null;
  }

  newSession() {
    document.getElementById("01").src = "./img/valid.png";
    document.getElementById("11").src = "./img/valid.png";
    this.validTile.push([0, 0]);
    this.validTile.push([1, 0]);
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

  // update the view of the webpage
  updateView() {
    for (var c = 0; c < MAX_COL; c++) {
      for (var r = 0; r < MAX_ROW; r++) {
        position = c.toString() + r.toString();
        document.getElementById(position).src = "./img/glass.png";
        position = this.currentXPos.toString() + this.currentYPos.toString();
        document.getElementById(position).src = "./img/player.png";
        for (index = 0; index < this.openTile.length; index++) {
          determin = this.openTile[index];
          if (determin[0] == c && determin[1] == r) {
            position = c.toString() + r.toString();
            document.getElementById(position).src = "./img/open.png";
          }
        }
        for (index = 0; index < this.validTile.length; index++) {
          determin = this.validTile[index];
          if (determin[0] == c && determin[1] == r) {
            position = c.toString() + r.toString();
            document.getElementById(position).src = "./img/valid.png";
          }
        }
        for (index = 0; index < this.deadTile.length; index++) {
          determin = this.deadTile[index];
          if (determin[0] == c && determin[1] == r) {
            position = c.toString() + r.toString();
            document.getElementById(position).src = "./img/broken.png";
          }
        }
      }
    }
  }

  stepForward(X, Y) {
    // blocking the user to step backward
    if (this.currentXPos < X) {
      this.currentXPos = X + 1;
      this.currentYPos = Y;
      // check is user dead while going forward
      if (Y == this.dangerLocation[X][1]) {
        console.log("User is dead");
        this.deadTile.push([X, Y]);
        this.currentXPos = 0;
        this.currentYPos = 0;
      } else {
        console.log("This tile is safe and revealed");
        this.openTile.push([X, Y]);
      }
    } else {
    }

    // update game view
    updateView();
  }
}

//
// var play = new GameSession();
// play.genSafeTile();
//
