class Camera {
    constructor(position, target, up){
        this.position = position;
        this.target = target;
        this.up = up;
    }
    setTarget(target){
        this.target = target;
    }
}