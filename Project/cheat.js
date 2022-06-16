function getCode() {
    code = document.getElementById("cheatCode").value;
    if (cheatCode = "12345678") {
        localStorage.setItem('cheatCode', 'yes');
        window.alert("Cheat activated")
    }
    else { localStorage.setItem('cheatCode', 'no');
window.alert("Not correct") }

}
//localStorage