const easyLife = 7;
const normalLife = 5;
const hardLise = 3;
const hardcoreLife = 2;
const PermaDeathLife = 1;

class player {
  constructor(diff, lifeCount, PlayerXPos, PlayerYPos, maxCount) {
    this.diff = null;
    this.lifeCount = null;
    this.maxCount = null;
    this.PlayerXPos = null;
    this.PlayerYPos = null;
  }
  reduceLife() {
    this.lifeCount -= 1;
  }
  setLife() {
    this.lifeCount = 0;
    this.lifeCount = 0;
  }
}

function updateView() {
  lifeBarColor(user.lifeCount, user.maxCount);
}

function gameInit() {
  localStorage.setItem("diff", "easy");
  document.getElementById("11").src = "./img/valid.png";
  document.getElementById("21").src = "./img/valid.png";
  user = new player();
}

function lifeBarColor(count, maxCount) {
  if (count / maxCount > 2 / 3) {
    document.getElementById("playerStatus").style.border =
      "border: 8px solid ##33ff7a";
  } else if (count / maxCount > 1 / 3) {
    document.getElementById("playerStatus").style.border =
      "border: 8px solid #d1c358";
  } else if (count / maxCount < 1 / 3) {
    document.getElementById("playerStatus").style.border =
      "border: 8px solid #ab0000";
  }
}

function changeDiff(selection) {
  if (selection == "easy") {
    localStorage.setItem("diff", selection);
  } else if (selection == "normal") {
    localStorage.setItem("diff", selection);
  } else if (selection == "hard") {
    localStorage.setItem("diff", selection);
  } else if (selection == "hardcore") {
    localStorage.setItem("diff", selection);
  } else if (selection == "permadeath") {
    localStorage.setItem("diff", selection);
  }
}

// Debug use only:

function run1round() {
  user.lifeCount -= 1;
  console.log(user.lifeCount);
}
