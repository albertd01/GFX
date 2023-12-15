class Pacman {
  constructor(lowerBody, upperBody) {
    this.upperBody = new PacmanUpperBody(upperBody);
    this.lowerBody = new PacmanLowerBody(lowerBody);
    this.direction = [-1, 0, 0];
    this.upperBody.setParent(this.lowerBody);
  }

  drawPacman() {
    this.lowerBody.model.draw();
    this.upperBody.model.draw();
  }

  defaultMovement() {
    this.upperBody.defaultMovement();
  }

  move(direction) {

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

    const moveSpeed = 0.1;
    const translationVector = [
      direction[0] * moveSpeed,
      direction[1] * moveSpeed,
      0,
    ];

    // Translate both upper and lower bodies
    this.lowerBody.model.translate(translationVector, true);
    this.upperBody.model.translate(translationVector, true);
  }
}

class PacmanLowerBody extends GameObject {
  constructor(model) {
    super(model);
    this.model.translate([10, 10, 1.7], true);
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

class PacmanUpperBody extends GameObject {
  constructor(model) {
    super(model);
    this.rotationAmount = 0;
    this.rotationDelta = 0.05;
    this.mouthOpening = true;
    this.model.translate([10, 10, 1.7], true);
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
