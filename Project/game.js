const MAX_ROUND = 9;
const MAX_COL = 9;
const MAX_ROW = 2;
var d = null;

class GameSession {
  constructor(safeLocation, currentPos) {
    this.safeLocation = [[], [], [], [], [], [], [], [], []]; // read as: col, row
    this.dangerLocation = [[], [], [], [], [], [], [], [], []];
    this.currentPos = [0, 0];
  }
  genSafeTile() {
    for (var c = 0; c < MAX_COL; c++) {
      d = Math.floor(Math.random() * 2);
      if (d < 1) {
        this.safeLocation[c] = [c, 0];
      } else {
        this.safeLocation[c] = [c, 1];
      }
    }
  }
  stepForward(X, Y, currentPos) {}
}

var play = new GameSession();
play.genSafeTile();
console.log(play.safeLocation);
