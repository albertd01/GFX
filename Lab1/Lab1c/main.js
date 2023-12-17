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

    //wcs = createWCS();

    const sphereModel = await loadSomething('sphere_smooth.obj');
    const hemisphere = await loadSomething('hemisphere_with_normals.obj');
    const upper = await loadSomething('pacmanUpper.obj');

    
    const upperbody = smoothCreationV2(upper, [1.0, 1.0, 0.0, 1.0]);
    const lowerbody = smoothCreationV2(hemisphere, [1.0, 1.0, 0.0, 1.0]);
    



    pacman = new Pacman(lowerbody, upperbody);

    arena = new GameArena();
    arena.init(sphereModel);

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
    //maybe just shear the projection matrix

    //shear view construction site
    if(event.key === 'v' ){
        if(!camera.viewSheared){
            camera.shearView();
            camera.viewSheared = true;
        }
        else{
            camera.invertShearView();
            camera.viewSheared = false;
        }
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
        pacman.move();
        camera.updateCamera();
    }
    arena.draw();
    pacman.draw();
    game.checkGameOver();
    requestAnimationFrame(render)
}

function updateCamera(){
    camera.setPosition(pacman.getDistanceFromOrigin());
    camera.setTarget(pacman.getDistanceFromOrigin());
    mat4.lookAt(matrices.viewMatrix, camera.position, camera.target, camera.up);
}

