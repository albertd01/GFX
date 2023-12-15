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
=======
>>>>>>> parent of 94895ea (checkpoint)
    if (parent) {
      parent.children.append(this);
    }
    this.parent = parent;
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
<<<<<<< HEAD

    for (const child of this.children) {
        child.updateWorldMatrix(this.worldMatrix);
=======
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
