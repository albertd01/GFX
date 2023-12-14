class Pacman{
    constructor(lowerBody, upperBody){
        this.upperBody = new PacmanUpperBody(upperBody);
        this.lowerBody = new PacmanLowerBody(lowerBody); 
        this.direction = [1,0,0];
        this.upperBody.setParent(this.lowerBody);
    }

    drawPacman(){
        this.lowerBody.model.draw();
        this.upperBody.model.draw();
    }

    defaultMovement(){
        this.upperBody.defaultMovement();
    }

    move(direction) {
        this.direction = direction;
        const moveSpeed = 0.1;
        const translationVector = [direction[0] * moveSpeed, direction[1] * moveSpeed, 0];
        
        // Translate both upper and lower bodies
        this.lowerBody.model.translate(translationVector, true);
        this.upperBody.model.translate(translationVector, true);
    }
}

class PacmanLowerBody extends GameObject{
    constructor(model){
        super();
        this.model = model;
        this.model.translate([10,10,1.7]);
        this.model.rotate(3,[0,1,0]);
        this.model.scale([0.5,0.5,0.5]);
        shapes.push(this.model);
    }

    turn(){
        this.model.rotate(Math.PI,[1,0,0]);
        this.updateWorldMatrix(null);
        
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
}