class GameObject {
  constructor() {
    this.children = [];
    this.worldMatrix = mat4.create();
  }

  addChild(child) {
    this.children.push(child);
  }

  setParent(parent) {
<<<<<<< HEAD
    this.parent = parent;
=======
>>>>>>> parent of 94895ea (checkpoint)
    if (parent) {
      parent.children.append(this);
    }
    this.parent = parent;
  }

  updateWorldMatrix(parentWorldMatrix) {
    console.log("calling updateWorldMAtrix in Pacman")
    const localMatrix = this.getLocalMatrix();

    if (parentWorldMatrix && localMatrix) {
        mat4.mul(this.worldMatrix, parentWorldMatrix, localMatrix);
    } else if (localMatrix) {
        mat4.copy(this.worldMatrix, localMatrix);
    }
<<<<<<< HEAD

    for (const child of this.children) {
        child.updateWorldMatrix(this.worldMatrix);
=======
    for (const child of this.children) {
      child.updateWorldMatrix(this.worldMatrix);
>>>>>>> parent of 94895ea (checkpoint)
    }
  }

<<<<<<< HEAD
    }

    getLocalMatrix(){
        return mat4.create();
    }
=======
  getLocalMatrix() {
    return mat4.create();
  }
>>>>>>> parent of 94895ea (checkpoint)
}

class Scene {
  constructor(rootObject) {
    this.root = rootObject;
    this.worldMatrix = mat4.create();
  }
}
