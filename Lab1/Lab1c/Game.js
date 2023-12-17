class Game{
    constructor(){
        this.running = false;
    }
    startGame(){
        this.running = true;
    }
    pauseGame(){
        this.running = false;
    }
    checkGameOver(){
        if(arena.dots.length===0){
            this.pauseGame();
        }
    }
}