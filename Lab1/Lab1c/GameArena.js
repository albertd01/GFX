class GameArena{
    constructor(){
        this.arenaModel =
        [
            ['W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W',], //1
            ['W','F','F','F','W','F','F','F','W','F','W','F','F','F','W','F','F','F','W',], //2
            ['W','F','W','F','W','F','W','F','W','F','W','F','W','F','W','F','W','F','W',], //3
            ['W','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','W',], //4
            ['W','F','W','W','W','W','W','W','W','F','W','W','W','W','W','W','W','F','W',], //5
            ['W','F','F','F','F','W','F','F','F','F','F','F','F','W','F','F','F','F','W',], //6
            ['W','F','F','W','F','W','F','W','W','F','W','W','F','W','F','W','F','F','W',], //7
            ['W','F','F','W','W','W','F','F','F','F','F','F','F','W','W','W','F','F','W',], //8
            ['W','F','F','F','F','F','F','F','W','F','W','F','F','F','F','F','F','F','W',], //9
            ['W','F','W','W','W','W','W','F','F','W','F','F','W','W','W','W','W','F','W',], //10
            ['W','F','F','F','F','F','F','F','W','F','W','F','F','F','F','F','F','F','W',], //11
            ['W','F','F','W','W','W','F','F','F','F','F','F','F','W','W','W','F','F','W',], //12
            ['W','F','F','W','F','W','F','W','W','F','W','W','F','W','F','W','F','F','W',], //13
            ['W','F','F','F','F','W','F','F','F','F','F','F','F','W','F','F','F','F','W',], //14
            ['W','F','W','W','W','W','W','W','W','F','W','W','W','W','W','W','W','F','W',], //15
            ['W','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','F','W',], //16
            ['W','F','W','F','W','F','W','F','W','F','W','F','W','F','W','F','W','F','W',], //17
            ['W','F','F','F','W','F','F','F','W','F','W','F','F','F','W','F','F','F','W',], //18
            ['W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W','W',], //19
        ]
    }
    init(){
        for(let i = 0; i < this.arenaModel.length; ++i){
            for(let j= 0; j < this.arenaModel[i].length; ++j){
                if(this.arenaModel[i][j]==='F'){
                    const floorTile = createFloorTile();
                    floorTile.translate([j, i, 0],true);
                    shapes.push(floorTile);
                }
                if(this.arenaModel[i][j]==='W'){
                    const wallTile = createWallTile();
                    wallTile.translate([j, i, 0],true);
                    shapes.push(wallTile);
                }
            }
        }
    }

}