class GameObject {
  constructor() {
    this.children = [];
    this.worldMatrix = mat4.create();
  }

  addChild(child) {
    this.children.push(child);
  }

  setParent(parent) {
    this.parent = parent;
    if (parent) {
      parent.addChild(this);
    }
  }

  updateWorldMatrix(parentWorldMatrix) {
    console.log("calling updateWorldMAtrix in Pacman")
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

    getLocalMatrix(){
        return mat4.create();
    }
}

class Scene {
  constructor(rootObject) {
    this.root = rootObject;
    this.worldMatrix = mat4.create();
  }
}
