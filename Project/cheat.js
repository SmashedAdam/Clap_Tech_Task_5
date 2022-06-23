var code = null;
function getCode() {
  code = document.getElementById("cheatCode").value;
  if (code == "FlyToTheSky") {
    sessionStorage.setItem("cheatCode", "yes");
    window.alert("Cheat activated");
  } else {
    sessionStorage.setItem("cheatCode", "no");
    window.alert("Not correct");
  }
}
function disableCode() {
    sessionStorage.setItem("cheatCode", "no");
}
//sessionStorage
