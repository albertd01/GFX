class GameObject {
  constructor(model) {
    this.model = model;
    //this.worldMatrix = mat4.create();
    this.children = [];
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
    if (parentWorldMatrix) {
      mat4.multiply(
        this.model.transformationMatrix,
        parentWorldMatrix,
        this.model.transformationMatrix
      );
    } else {
      mat4.copy(this.worldMatrix, this.model.transformationMatrix);
    }
    var worldMatrix = this.worldMatrix;
    for (const child of this.children) {
      child.updateWorldMatrix(worldMatrix);
    }
  }
}

class Scene {
  constructor(rootObject) {
    this.root = rootObject;
    this.worldMatrix = mat4.create();
  }
}
