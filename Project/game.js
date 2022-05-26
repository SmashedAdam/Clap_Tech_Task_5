var row1 = [11,21];
var row2 = [12,22];
var row3 = [13,23];
var row4 = [14,24];
var row5 = [15,25];
var row6 = [16,26];
var row7 = [17,27];
var row8 = [18,28];
var row9 = [19,29];
var glassCord = [];
var safeCord = [];


function ranNumGen(max) {
    return Math.floor(Math.random() * max);
}


function gameInit() {
    localStorage.setItem("diff", "easy");
    document.getElementById("11").src = "./img/valid.png";
    document.getElementById("21").src = "./img/valid.png";
    determineGlassCord();
    displayManager();
  }

function chooseGlass() {

}



function determineGlassCord() {
    
    safeCord.push();
}