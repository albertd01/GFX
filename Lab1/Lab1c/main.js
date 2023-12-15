window.onload = async () => {
    // basic setup
    let canvas = document.getElementById("canvas");
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
    gl.clearColor(0.729, 0.764, 0.674, 1);

    camera = new Camera([10,-4, 32], [10, 10, 0], [0, 1, 0]);
    light = new Light([5, 5, 30]);

    // calculate view and projection matrix
    mat4.perspective(matrices.projectionMatrix, toRad(30), canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    mat4.lookAt(matrices.viewMatrix, camera.position, camera.target, camera.up);

    //initializing and enabling shader
    shaderPrograms.phongSpecular = new ShaderProgram(shaders.phongVertex, shaders.phongFragmentSpecular, shaderInfo);
    shaderPrograms.phongSpecular.enable();

    wcs = createWCS();

    const sphere = await loadSomething('sphere_smooth.obj');
    const hemisphere = await loadSomething('hemisphere_with_normals.obj');
    const upper = await loadSomething('pacmanUpper.obj');


    
    const upperbody = smoothCreationV2(upper, [1.0,1.0,0.0,1.0]);
    const lowerbody = smoothCreationV2(hemisphere, [1.0,1.0,0.0,1.0]);


    pacman = new Pacman(lowerbody, upperbody);

    arena = new GameArena();
    arena.init();

    game = new Game();
    // start render loop
    requestAnimationFrame(render);
}

async function loadSomething(path) {
    const data = await fetch(path).then(result => result.text());
    return parse(data);
}


window.addEventListener("keydown", (event) => {
    let direction = pacman.direction;
    switch (event.key) {
        case 'ArrowUp':
            direction = [0,1,0];
            break;
        case 'ArrowDown':
            direction = [0,-1,0];
            break;
        case 'ArrowLeft':
            direction = [-1,0,0];
            break;
        case 'ArrowRight':
            direction = [1,0,0];
            break;
    }
    //pacman.move();
    //console.log(pacman.getDistanceFromOrigin());
    if(direction){
        pacman.setDirection(direction);
    }
})

window.addEventListener("keydown", (event) => {
    switch(event.key){
        case 'g':
            game.startGame();
            break;
        case 'p':
            game.pauseGame();
            break;
    }
})

window.addEventListener("keydown", (event) => {
    //shear view construction site
    if(event.key === 'v'){
        console.log("here");
        const theta = Math.acos(vec3.dot(camera.viewingDirection, vec3.fromValues(1,0,0)));
        const phi = Math.acos(vec3.dot(camera.viewingDirection, vec3.fromValues(0,1,0)));
        const lambda = Math.acos(vec3.dot(camera.viewingDirection, vec3.fromValues(0,0,1)));
        console.log(matrices.projectionMatrix);
        //matrices.projectionMatrix =obliqueProjection(theta, phi, lambda);
        mat4.mul(matrices.projectionMatrix, matrices.projectionMatrix, obliqueProjection(theta, phi, lambda));
        console.log(matrices.projectionMatrix);
        //if(projectionMode === sheared)
            //define oblique projection matrix
            //multiply current projection matrix with oblique projection
        //else
            //go back to standard projection by multiplying oblique projection matrix with its inverse
    }
})




let then = 0;

function render(now) {
    // calculate time per frame in seconds
    let delta = now - then;
    delta *= 0.001;
    then = now;
    const currentlightPosition = vec4.fromValues(light.position[0], light.position[1], light.position[2], 1);

    vec4.transformMat4(currentlightPosition, currentlightPosition, matrices.viewMatrix);
    gl.uniform4fv(currentShaderProgram.uniforms.lightPosition, currentlightPosition);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if(game.running){
        pacman.defaultMovement();
        if(checkMove()){
            pacman.move();
        }
        updateCamera();
    }

    shapes.forEach(shape => {
        shape.draw();
    });
    //pacman.lowerBody.model.drawLCS();
    requestAnimationFrame(render)
}

function updateCamera(){
    camera.setPosition(pacman.getDistanceFromOrigin());
    camera.setTarget(pacman.getDistanceFromOrigin());
    mat4.lookAt(matrices.viewMatrix, camera.position, camera.target, camera.up);
}

function obliqueProjection(theta, phi, lambda) {
    // Create a standard orthographic projection matrix
    console.log("here2");
    projectionMatrix = mat4.fromValues(
        1.0, 0.0, lambda * Math.cos(theta), -Math.sin(theta),
        0.0, 1.0, lambda * Math.sin(phi), -Math.cos(phi),
        0.0, 0.0, -1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    );

    return projectionMatrix;
}

function checkMove(){
    return true;
}