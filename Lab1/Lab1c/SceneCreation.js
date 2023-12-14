class GameObject {
  constructor() {
    this.children = [];
    this.worldMatrix = mat4.create();
  }

  addChild(child) {
    this.children.push(child);
  }

  setParent(parent) {
    console.log("setting parent..");
    this.parent = parent;
    if (parent) {
      parent.addChild(this);
    }
  }

  updateWorldMatrix(parentWorldMatrix) {
    if (parentWorldMatrix) {
      mat4.multiply(this.worldMatrix, parentWorldMatrix, this.getLocalMatrix());
    } else {
      mat4.copy(this.worldMatrix, this.getLocalMatrix());
    }
    var worldMatrix = this.worldMatrix;
    for (const child of this.children) {
      child.updateWorldMatrix(worldMatrix);
    }

    }

    getLocalMatrix(){
        return this.model.transformationMatrix;
    }
}

class Scene {
  constructor(rootObject) {
    this.root = rootObject;
    this.worldMatrix = mat4.create();
  }
}
