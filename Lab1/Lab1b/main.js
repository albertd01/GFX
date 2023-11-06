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
    shaderPrograms.gouraudDiffuse = new ShaderProgram(shaders.gouraudDiffuse, shaders.fragment, shaderInfo);
    shaderPrograms.noLightProgram.enable();

    wcs = createWCS();

    
    const teapot = await loadSomething('teapot.obj');
    const sphere = await loadSomething('sphere_smooth.obj');
    const bunny = await loadSomething('bunny.obj');
    
    shapes.push(createShapeGivenVerticesAndFaces(bunny));
    shapes[0].translate([-0.5, 0.5,0]);
    shapes[0].scale([2.0, 2.0, 2.0]);

    shapes.push(createShapeGivenVerticesAndFaces(bunny));
    shapes[1].translate([0.0, 0.5, 0.0]);
    shapes[1].scale([2.0, 2.0, 2.0]);

    shapes.push(createShapeGivenVerticesAndFaces(bunny));
    shapes[2].translate([0.5, 0.5, 0.0]);
    shapes[2].scale([2.0, 2.0, 2.0]);

    shapes.push(createShapeGivenVerticesAndFaces(teapot));
    shapes[3].translate([-0.9,-0.2,0]);
    shapes[3].scale([0.4,0.4,0.4]);

    shapes.push(createShapeGivenVerticesAndFaces(teapot));
    shapes[4].translate([0,-0.2,0]);
    shapes[4].scale([0.4,0.4,0.4]);

    shapes.push(createShapeGivenVerticesAndFaces(teapot));
    shapes[5].translate([0.9,-0.2,0]);
    shapes[5].scale([0.4,0.4,0.4]);

    shapes.push(createShapeGivenVerticesAndFaces(sphere));
    shapes[6].translate([-0.9, -0.5, 0]);
    shapes[6].scale([0.2,0.2,0.2]);

    shapes.push(createShapeGivenVerticesAndFaces(sphere));
    shapes[7].translate([0, -0.5, 0]);
    shapes[7].scale([0.2,0.2,0.2]);

    shapes.push(createShapeGivenVerticesAndFaces(sphere));
    shapes[8].translate([0.8, -0.5, 0]);
    shapes[8].scale([0.2,0.2,0.2]);

    
    // Attach event listener for keyboard events to the window
    window.addEventListener("keydown", (event) => {

        switch(event.key){
            case 'w':
                console.log("switching to Gouraud/diffuse");
                break;
            case 'e':
                console.log("switching to Gouraud/specular");
                break;
            case 'r':
                console.log("switching to Phong/diffuse");
                break;
            case 't':
                console.log("switching to Phong/specular");
                break;
        }
        // swap shader program
        if (currentShaderProgram === shaderPrograms.noLightProgram) {
            shaderPrograms.gouraudDiffuse.enable();
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
        //shape.rotate(1 * delta, [0, 1, 1]);
        shape.draw();
    });
    wcs.draw();
    requestAnimationFrame(render)
}



