class Pacman {
  constructor(lowerBody, upperBody) {
    this.upperBody = new PacmanUpperBody(smoothCreationV2(upperBody, [1.0, 1.0, 0.0, 1.0]));
    this.lowerBody = new PacmanLowerBody(smoothCreationV2(lowerBody, [1.0, 1.0, 0.0, 1.0]));
    this.direction = [-1, 0, 0];
    this.arenaPosition =[1,1];
  }

  getDistanceFromOrigin(){
    const currentMatrix = this.upperBody.model.transformationMatrix;
    return [currentMatrix[12], currentMatrix[13],currentMatrix[14]];
  }


  drawPacman() {
    this.lowerBody.model.draw();
    this.upperBody.model.draw();
  }

  jump(){
    //set isJumping field to true so that move can check if dots should be removed
    //use a sine function for the jump-motion
  }

  defaultMovement() {
    this.upperBody.defaultMovement();
  }

  setDirection(direction){
    if (direction != this.direction) {
        const angleCos = direction[0] * this.direction[0] + direction[1] * this.direction[1];
        let angle = Math.acos(angleCos);
        if (Math.abs(angleCos)!=1) {
          // Use the cross product to determine the rotation direction
          const crossProduct = [
            this.direction[1] * direction[2] - this.direction[2] * direction[1],
            this.direction[2] * direction[0] - this.direction[0] * direction[2],
            this.direction[0] * direction[1] - this.direction[1] * direction[0],
          ];
  
          // Check the sign of the cross product to determine rotation direction
          const sign = Math.sign(crossProduct[2]);
  
          // Apply the sign to the angle to get the correct direction
          angle = angle * sign;
        }
  
        //set new direction and turn upper and lower bodies
        this.direction = direction;
        this.lowerBody.turn(angle);
        this.upperBody.turn(angle);
      }
  }

  move() {
    const moveSpeed = 0.1;

    

    const translationVector = [
      this.direction[0] * moveSpeed,
      this.direction[1] * moveSpeed,
      0,
    ];

    // Translate both upper and lower bodies
    this.lowerBody.model.translate(translationVector, true);
    this.upperBody.model.translate(translationVector, true);

    const originDistance = this.getDistanceFromOrigin();
    this.arenaPosition = [Math.floor(originDistance[0]) , Math.floor(originDistance[1])];
    if(arena.arenaModel[this.arenaPosition[1]][this.arenaPosition[0]] === 'W'){
        this.lowerBody.model.translate([-translationVector[0], -translationVector[1], -translationVector[2]], true);
        this.upperBody.model.translate([-translationVector[0], -translationVector[1], -translationVector[2]], true);
    }
    else{
        arena.removeDot(this.arenaPosition[1], this.arenaPosition[0]);
        document.querySelector(".points").innerHTML = "remaining points: " + arena.dots.length;
    }
    for(let i = 0; i<ghosts.length; ++i){
      if(ghosts[i].arenaPosition){
        if(ghosts[i].arenaPosition[0] === this.arenaPosition[0] && ghosts[i].arenaPosition[1] === this.arenaPosition[1]){
          --game.lives;
          game.resetState();
          return;
        }
      }
    }
    document.querySelector(".lives").innerHTML = game.lives;
  }
  draw(){
    this.lowerBody.model.draw();
    this.upperBody.model.draw();
  }
}

class PacmanLowerBody {
  constructor(model) {
    this.xOffset = 1.6;
    this.yOffset = 1.5;
    this.model = model;
    this.model.translate([this.xOffset, this.yOffset, 1.7], true);
    this.model.rotate(3, [0, 1, 0]);
    this.model.scale([0.5, 0.5, 0.5]);
    shapes.push(this.model);
  }

  turn(angle) {
    const currentTransformationMatrix = this.model.transformationMatrix;
    const currentTranslation = [
      currentTransformationMatrix[12],
      currentTransformationMatrix[13],
      currentTransformationMatrix[14],
    ];
    this.model.translate(
      [-currentTranslation[0], -currentTranslation[1], -currentTranslation[2]],
      true
    );
    this.model.rotate(angle, [0, 0, 1], true);
    this.model.translate(currentTranslation, true);
  }
}

class PacmanUpperBody {
  constructor(model) {
    this.model = model;
    this.rotationAmount = 0;
    this.rotationDelta = 0.05;
    this.mouthOpening = true;
    this.xOffset = 1.6;
    this.yOffset = 1.5;
    this.model.translate([this.xOffset, this.yOffset, 1.7], true);
    this.model.scale([0.5, 0.5, 0.5]);
    shapes.push(this.model);
  }

  defaultMovement() {
    if (this.mouthOpening) {
      this.openMouth();
    } else {
      this.closeMouth();
    }
  }

  turn(angle) {
    const currentTransformationMatrix = this.model.transformationMatrix;
    const currentTranslation = [
      currentTransformationMatrix[12],
      currentTransformationMatrix[13],
      currentTransformationMatrix[14],
    ];
    this.model.translate(
      [-currentTranslation[0], -currentTranslation[1], -currentTranslation[2]],
      true
    );
    this.model.rotate(angle, [0, 0, 1], true);
    this.model.translate(currentTranslation, true);
  }

  openMouth() {
    this.rotationAmount += this.rotationDelta;
    if (this.rotationAmount > 1) {
      this.mouthOpening = false;
    }
    this.model.rotate(this.rotationDelta, [0, 1, 0]);
  }

  closeMouth() {
    this.rotationAmount -= this.rotationDelta;
    if (this.rotationAmount < 0) {
      this.mouthOpening = true;
    }
    this.model.rotate(this.rotationDelta, [0, -1, 0]);
  }
}
