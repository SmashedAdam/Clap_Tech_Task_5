class player {
    constructor(lifeCount, PlayerXPos, PlayerYPos){
        this.lifeCount = null;
        this.PlayerXPos = null;
        this.PlayerYPos = null;
    }
    get output() {
        return this.PlayerXPos;
        }
    }




var user = new player();
console.log(user.output);





var r = 10;
var c = 20;


console.log(r.toString() + c.toString());