class Pacman extends GameObject{
    constructor(){
        super();
        this.direction = [1,0,0];
    }


    move(direction) {
        this.direction = direction;
        const moveSpeed = 0.1;
        const translationVector = [direction[0] * moveSpeed, direction[1] * moveSpeed, 0];
        
        const translationMatrix = mat4.create();
        mat4.translate(translationMatrix, translationMatrix, translationVector);
        mat4.mul(this.worldMatrix, translationMatrix, this.worldMatrix);

        this.updateWorldMatrix(null);
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

    updateWorldMatrix(parentWorldMatrix) {
        console.log("calling updateWorldMatrix in lower")
        const localMatrix = this.getLocalMatrix();
    
        if (parentWorldMatrix && localMatrix) {
            mat4.mul(this.worldMatrix, parentWorldMatrix, localMatrix);
            mat4.mul(this.model.transformationMarix, parentWorldMatrix, localMatrix);
        } else if (localMatrix) {
            mat4.copy(this.worldMatrix, localMatrix);
        }
    
        for (const child of this.children) {
            child.updateWorldMatrix(this.worldMatrix);
        }
    
    }

    turn(){
        this.model.rotate(Math.PI,[1,0,0]);
        this.updateWorldMatrix(null);
    }

    getLocalMatrix(){
        return this.model.transformationMarix;
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

    updateWorldMatrix(parentWorldMatrix) {
        console.log("calling updateWorldMatrix in upper")
        const localMatrix = this.getLocalMatrix();
    
        if (parentWorldMatrix && localMatrix) {
            mat4.mul(this.worldMatrix, parentWorldMatrix, localMatrix);
        } else if (localMatrix) {
            mat4.copy(this.worldMatrix, localMatrix);
        }
    
        for (const child of this.children) {
            child.updateWorldMatrix(this.worldMatrix);
        }
    
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
        return this.model.transformationMarix;
    }
}