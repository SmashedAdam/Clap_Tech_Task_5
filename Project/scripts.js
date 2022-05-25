const easyLife = 7;
const normalLife = 5;
const hardLife = 3;
const hardcoreLife = 2;
const PermaDeathLife = 1;
var diff = null;

function displayManager() {
  console.log(document.getElementById("lifeDisplay").innerHTML);
  lifeBarColor();
  diffBarColor();
}

function gameInit() {
  localStorage.setItem("diff", "easy");
  document.getElementById("11").src = "./img/valid.png";
  document.getElementById("21").src = "./img/valid.png";
  displayManager();
}

function lifeBarColor(count, maxCount) {
    count = 10;
    maxCount = 11;
  if (count / maxCount > 2 / 3) {
    document.getElementById("playerStatus").style.border =
      "8px solid ##33ff7a";
  } else if (count / maxCount > 1 / 3) {
    document.getElementById("playerStatus").style.border =
      "8px solid #d1c358";
  } else if (count / maxCount < 1 / 3) {
    document.getElementById("playerStatus").style.border =
      "8px solid #ab0000";
  }
}

function diffBarColor() {
    diff = window.localStorage.getItem("diff");
  if (diff == "easy") {
    document.getElementById("diffStatus").style.border =
      "8px solid #57ffb1";
  }
}
