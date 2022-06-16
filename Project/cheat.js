var code = null;
function getCode() {
    code = document.getElementById("cheatCode").value;
    if (code == "12345678") {
        localStorage.setItem('cheatCode', 'yes');
        window.alert("Cheat activated")
    }
    else { localStorage.setItem('cheatCode', 'no');
window.alert("Not correct") }

}
//localStorage