class Game{
    constructor(){
        this.running = false;
        this.lives = 3;
        this.hasLost = false;
        this.hasWon = false;
    }
    startGame(){
        this.running = true;
    }
    pauseGame(){
        this.running = false;
    }
    checkGameOver(){
        if(arena.dots.length===0 || this.lives === 0){
            if(this.lives === 0){
                this.hasLost = true;
            }
            if(arena.dots.length===0 ){
                this.hasWon = true;
            }
            this.pauseGame();
            return true;
        }
        return false;
    }
    resetState(){
        pacman = new Pacman(models.hemisphere, models.upper);
        ghosts = [];
        ghosts.push(new Ghost(models.ghostHead, models.ghostTorso, [1,3]));
        ghosts.push(new Ghost(models.ghostHead, models.ghostTorso, [1,15]));
        ghosts.push(new Ghost(models.ghostHead, models.ghostTorso, [16,8]));
    }
}