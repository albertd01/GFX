window.onload = async () => {
    // basic setup
    let canvas = document.getElementById("canvas");
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
    gl.clearColor(0.729, 0.764, 0.674, 1);

    // calculate view and projection matrix
    mat4.perspective(matrices.projectionMatrix, toRad(45), canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    mat4.lookAt(matrices.viewMatrix, [0, 0, 2], [0, 0, 0], [0, 1, 0]);

    // create shader programs and enable one of them
    shaderPrograms.noLightProgram = new ShaderProgram(shaders.noLight, shaders.fragment, shaderInfo);
    shaderPrograms.withLightProgram = new ShaderProgram(shaders.withLight, shaders.fragment, shaderInfo);
    shaderPrograms.noLightProgram.enable();

    /*
    const cube = await loadSomething('cube.obj');
    console.log(cube.length)
    shapes.push(createShapeGivenVerticesAndFaces(cube));
    */
    const bunny = await loadSomething('bunny.obj');
    shapes.push(createShapeGivenVerticesAndFaces(bunny));
    
    // Attach event listener for keyboard events to the window
    window.addEventListener("keydown", (event) => {
        // swap shader program
        if (currentShaderProgram === shaderPrograms.noLightProgram) {
            shaderPrograms.withLightProgram.enable();
        } else {
            shaderPrograms.noLightProgram.enable();
        }
    })

    // start render loop
    requestAnimationFrame(render);
}

async function loadSomething(path) {
    const data = await fetch(path).then(result => result.text());
    return parse(data);
}

let then = 0;

function render(now) {
    // calculate time per frame in seconds
    let delta = now - then;
    delta *= 0.001;
    then = now;

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    shapes.forEach(shape => {
        // scale rotation amount by time difference
        shape.rotate(1 * delta, [0, 1, 1]);
        shape.draw();
    });

    requestAnimationFrame(render)
}



