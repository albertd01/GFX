class Ghost {
    constructor(head, torso, startingPosition) {
        this.arenaPosition = startingPosition;
        this.head = smoothCreationV2(head, [0.5, 0.3, 0.89, 1.0]);
        this.head.rotate(Math.PI / 2, [1, 0, 0]);
        this.head.scale([0.4, 0.4, 0.4]);
        this.head.translate([0.5+startingPosition[0], 0.5+startingPosition[1], 1.5], true);

        this.torso = smoothCreationV2(torso, [0.5, 0.3, 0.89, 1.0]);
        this.torso.translate([0.5+startingPosition[0], 0.5+startingPosition[1], 1.5], true);
        this.torso.rotate(Math.PI / 2, [1, 0, 0]);
        this.torso.scale([0.4, 0.4, 0.4]);

        this.lookDirection = [1, 0, 0];
        this.walkDirection = [1, 0, 0];
    }
    draw() {
        this.head.draw();
        this.torso.draw();
    }
    defaultMovement() {
        const moveSpeed = 0.1;

        const translationVector = [
            this.walkDirection[0] * moveSpeed,
            this.walkDirection[1] * moveSpeed,
            0,
        ];

        // Translate both upper and lower bodies
        this.head.translate(translationVector, true);
        this.torso.translate(translationVector, true);

        const originDistance = this.getDistanceFromOrigin();
        this.arenaPosition = [Math.floor(originDistance[0]), Math.floor(originDistance[1])];
        if (arena.arenaModel[this.arenaPosition[1]][this.arenaPosition[0]] === 'W') {
            this.head.translate([-translationVector[0], -translationVector[1], -translationVector[2]], true);
            this.torso.translate([-translationVector[0], -translationVector[1], -translationVector[2]], true);
            this.walkDirection = [-this.walkDirection[0],0,0];
        }
    }
    rotateEyes() {

    }
    getDistanceFromOrigin(){
        const currentMatrix = this.torso.transformationMatrix;
        return [currentMatrix[12], currentMatrix[13],currentMatrix[14]];
    }
}