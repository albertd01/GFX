class Camera {
    constructor(position, target, up){
        this.position = position;
        this.target = target;
        this.up = up;
        this.offset =10;
        this.viewingDirection = vec3.fromValues(this.target[0]-this.position[0],this.target[1]-this.position[1],this.target[2]-this.position[2]);
        vec3.normalize(this.viewingDirection, this.viewingDirection);
    }
    setPosition(position){
        this.position = [position[0], position[1]-this.offset, this.position[2]];
        this.updateViewDir();
    }

    setTarget(target){
        this.target = target;
        this.updateViewDir();
    }

    updateViewDir(){
        this.viewingDirection = vec3.fromValues(this.target[0]-this.position[0],this.target[1]-this.position[1],this.target[2]-this.position[2]);
        vec3.normalize(this.viewingDirection, this.viewingDirection);
    }
}