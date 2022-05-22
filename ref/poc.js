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