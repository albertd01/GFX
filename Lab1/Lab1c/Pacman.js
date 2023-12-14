class Pacman {
    constructor(lowerBody, upperBody){
        this.upperBody = upperBody;
        this.lowerBody = lowerBody; 
        this.mouthOpening = true;
        this.direction = [1,0,0];
        this.rotationAmount = 0;
        this.rotationDelta = 0.05;
    }
    
    init(){
        this.lowerBody.translate([10,10,1.7]);
        this.lowerBody.rotate(3,[0,1,0]);
        this.lowerBody.scale([0.5,0.5,0.5]);
        this.upperBody.translate([10,10,1.7]);
        this.upperBody.scale([0.5,0.5,0.5]);
        //shapes.push(this.upperBody);
        //shapes.push(this.lowerBody);
    }


    drawPacman(){
        this.lowerBody.draw();
        this.upperBody.draw();
    }

    defaultMovement(){
        //console.log(this.rotationAmount);
        if(this.mouthOpening){
            this.openMouth();
        }
        else{
            this.closeMouth();
        }
    }

    openMouth(){
        this.rotationAmount += this.rotationDelta;
        if(this.rotationAmount > 1){
            this.mouthOpening = false;
        }
        this.upperBody.rotate(this.rotationDelta, [0,1,0]);
    }

    closeMouth(){
        this.rotationAmount -= this.rotationDelta;
        if(this.rotationAmount < 0){
            this.mouthOpening = true;
        }
        this.upperBody.rotate(this.rotationDelta, [0,-1,0]);
    }

    move(direction){
        const moveSpeed = 0.1;
        const translationVector = [direction[0]*moveSpeed, direction[1]*moveSpeed, 0]
        this.upperBody.translate(translationVector,true);
        this.lowerBody.translate(translationVector,true);
        //this.turn(direction);
        //translate pacmans upper and lower body in the passed direction
        //call turn(direction)
    }

    turn90degrees(){
        //console.log("here");
        //this.upperBody.rotate(Math.PI, [0,0,1]);
        this.lowerBody.rotate(Math.PI, [0,1,0]);
    }

    turn(direction){
        console.log(this.direction + direction);
        const rotationAngle = Math.acos(direction[0]*this.direction[0]+direction[1]*this.direction[1])
        console.log(rotationAngle);
        //this.direction=direction;
        //this.upperBody.rotate(rotationAngle, [0,0,1]);
        //this.lowerBody.rotate(rotationAngle, [0,0,1]);
    }


}

class PacmanLowerBody extends GameObject{
    constructor(model){
        super();
        this.model = model;
        this.lowerBody.translate([10,10,1.7]);
        this.lowerBody.rotate(3,[0,1,0]);
        this.lowerBody.scale([0.5,0.5,0.5]);
        shapes.push(this.model);
    }
    
    getLocalMatrix(){
        return this.model.transformationMatrix;
    }
}

class PacmanUpperBody extends GameObject{
    constructor(model){
        super();
        this.model = model;
        this.rotationAmount = 0;
        this.rotationDelta = 0.05;
        this.mouthOpening = true;
        this.model.translate([10,10,1.7]);
        this.model.scale([0.5,0.5,0.5]);
        shapes.push(this.model);
    }

    defaultMovement(){
        if(this.mouthOpening){
            this.openMouth();
        }
        else{
            this.closeMouth();
        }
    }

    openMouth(){
        this.rotationAmount += this.rotationDelta;
        if(this.rotationAmount > 1){
            this.mouthOpening = false;
        }
        this.model.rotate(this.rotationDelta, [0,1,0]);
    }

    closeMouth(){
        this.rotationAmount -= this.rotationDelta;
        if(this.rotationAmount < 0){
            this.mouthOpening = true;
        }
        this.model.rotate(this.rotationDelta, [0,-1,0]);
    }

    getLocalMatrix(){
        return this.model.transformationMatrix;
    }
}