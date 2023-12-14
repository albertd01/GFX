window.onload = async () => {
    // basic setup
    let canvas = document.getElementById("canvas");
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
    gl.clearColor(0.729, 0.764, 0.674, 1);

    camera = new Camera([10,-4, 32], [10, 10, 0], [0, 1, 0]);
    light = new Light([5, 5, 20]);

    // calculate view and projection matrix
    mat4.perspective(matrices.projectionMatrix, toRad(30), canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    mat4.lookAt(matrices.viewMatrix, camera.position, camera.target, camera.up);

    //initializing and enabling shader
    shaderPrograms.phongSpecular = new ShaderProgram(shaders.phongVertex, shaders.phongFragmentSpecular, shaderInfo);
    shaderPrograms.phongSpecular.enable();

    wcs = createWCS();

    const sphere = await loadSomething('sphere_smooth.obj');
    const hemisphere = await loadSomething('hemisphere_with_normals.obj');


    
    const upperbody = smoothCreationV2(hemisphere, [1.0,1.0,0.0,1.0]);
    const lowerbody = smoothCreationV2(hemisphere, [1.0,1.0,0.0,1.0]);
    pacman = new Pacman();
    pacmanLower = new PacmanLowerBody(lowerbody);
    pacmanUpper = new PacmanUpperBody(upperbody);

    pacmanUpper.setParent(pacmanLower);
    pacmanLower.setParent(pacman);

   
    
    //pacman = smoothCreationV2(sphere, [1.0, 1.0, 0.0, 1.0]);
    //pacman.translate([0,0,1.5])
    //pacman.scale([0.5, 0.5, 0.5]);
    //pacman.translate([2,6,0], true);


    //shapes[1].scale([0.3, 0.3, 0.3]);
    //shapes[1].translate([0,0,-0.5]);

    //shapes.push(createFloorTile());

    const arena = new GameArena();
    arena.init();

    // start render loop
    requestAnimationFrame(render);
}

async function loadSomething(path) {
    const data = await fetch(path).then(result => result.text());
    return parse(data);
}


window.addEventListener("keydown", (event) => {
    var direction;
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
    if(direction){
        pacman.move(direction);
    }
    
    
    //pacman.defaultMovement();
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

    pacmanUpper.defaultMovement();

    shapes.forEach(shape => {
        shape.draw();
    });
    pacmanLower.model.drawLCS();
    //pacman.upperBody.model.drawLCS();
    //pacman.drawPacman();
    requestAnimationFrame(render)
}




