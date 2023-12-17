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
        this.walls = [];
        this.dots = [];
        this.floors = [];
    }
    init(sphereModel){
        for(let i = 0; i < this.arenaModel.length; ++i){
            for(let j= 0; j < this.arenaModel[i].length; ++j){
                if(this.arenaModel[i][j]==='F'){
                    const floorTile = createFloorTile();
                    floorTile.translate([j, i, 0],true);
                    this.floors.push(floorTile);

                    const pacmanFood = smoothCreationV2(sphereModel, [1.0, 1.0, 0.0, 1.0]);
                    pacmanFood.scale([0.1, 0.1, 0.1]);
                    pacmanFood.translate([j+0.5, i+0.5, 1.5],true);
                    const dot = new Dot(i,j,pacmanFood);
                    this.dots.push(dot);
                }
                if(this.arenaModel[i][j]==='W'){
                    const wallTile = createWallTile();
                    wallTile.translate([j, i, 0],true);
                    this.walls.push(wallTile);
                }
            }
        }
    }

    removeDot(x,y){
        this.dots = this.dots.filter(dot => dot.x != x || dot.y != y);
    }

    draw(){
        this.walls.forEach(wall => {
            wall.draw();
        })
        this.dots.forEach(dot => {
            dot.model.draw();
        })
        this.floors.forEach(floor => {
            floor.draw();
        })
    }
}

class Dot {
    constructor(x,y, model){
        this.x = x;
        this.y = y;
        this.model = model;
    }
}

