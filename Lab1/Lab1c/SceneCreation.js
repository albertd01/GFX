class GameObject {
  constructor() {
    this.children = [];
    this.worldMatrix = mat4.create();
  }

  addChild(child) {
    this.children.push(child);
  }

  setParent(parent) {
    if (parent) {
      parent.children.append(this);
    }
    this.parent = parent;
  }

  updateWorldMatrix(parentWorldMatrix) {
    if (parentWorldMatrix) {
      mat4.multiply(this.worldMatrix, parentWorldMatrix, this.getLocalMatrix());
    } else {
      mat4.copy(this.worldMatrix, this.getLocalMatrix());
    }
    for (const child of this.children) {
      child.updateWorldMatrix(this.worldMatrix);
    }
  }

  getLocalMatrix() {
    return mat4.create();
  }
}

class Scene {
  constructor(rootObject) {
    this.root = rootObject;
    this.worldMatrix = mat4.create();
  }
}
