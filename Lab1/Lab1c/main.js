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
    pacman = new Pacman(lowerbody, upperbody);
    pacman.init();
   
    
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
    let xPos = 0;
    let yPos = 0;
    switch (event.key) {
        case 'ArrowUp':
            yPos -= 1;
            break;
        case 'ArrowDown':
            yPos += 1;
            break;
        case 'ArrowLeft':
            xPos += 1;
            break;
        case 'ArrowRight':
            xPos -= 1;
            break;
    }
    pacman.move([-xPos, -yPos, 0]);
    //pacman.turn90degrees();
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

    pacman.defaultMovement();

    shapes.forEach(shape => {
        shape.draw();
    });
    pacman.drawPacman();
    requestAnimationFrame(render)
}




