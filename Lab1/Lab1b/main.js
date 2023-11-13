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
    shaderPrograms.noLightProgram = new ShaderProgram(shaders.noLight, shaders.gouraudFragment, shaderInfo);
    shaderPrograms.gouraudDiffuse = new ShaderProgram(shaders.gouraudDiffuse, shaders.gouraudFragment, shaderInfo);
    shaderPrograms.gouraudSpecular = new ShaderProgram(shaders.gouraudSpecular, shaders.gouraudFragment, shaderInfo);
    shaderPrograms.phongSpecular = new ShaderProgram(shaders.phongVertex, shaders.phongFragmentSpecular, shaderInfo);
    shaderPrograms.phongDiffuse = new ShaderProgram(shaders.phongVertex, shaders.phongFragmentDiffuse, shaderInfo);
    shaderPrograms.noLightProgram.enable();

    wcs = createWCS();

    
    const teapot = await loadSomething('teapot.obj');
    const sphere = await loadSomething('sphere_smooth.obj');
    const bunny = await loadSomething('bunny.obj');
    
    shapes.push(smoothCreation(bunny));
    shapes[0].translate([-0.5, 0.5,0]);
    shapes[0].scale([2.0, 2.0, 2.0]);

    shapes.push(smoothCreation(bunny));
    shapes[1].translate([0.0, 0.5, 0.0]);
    shapes[1].scale([2.0, 2.0, 2.0]);

    shapes.push(smoothCreation(bunny));
    shapes[2].translate([0.5, 0.5, 0.0]);
    shapes[2].scale([2.0, 2.0, 2.0]);

    shapes.push(smoothCreation(teapot));
    shapes[3].translate([-0.9,-0.2,0]);
    shapes[3].scale([0.4,0.4,0.4]);

    shapes.push(smoothCreation(teapot));
    shapes[4].translate([0,-0.2,0]);
    shapes[4].scale([0.4,0.4,0.4]);

    shapes.push(smoothCreation(teapot));
    shapes[5].translate([0.9,-0.2,0]);
    shapes[5].scale([0.4,0.4,0.4]);

    shapes.push(smoothCreation(sphere));
    shapes[6].translate([-0.9, -0.5, 0]);
    shapes[6].scale([0.2,0.2,0.2]);

    shapes.push(smoothCreation(sphere));
    shapes[7].translate([0, -0.5, 0]);
    shapes[7].scale([0.2,0.2,0.2]);

    shapes.push(smoothCreation(sphere));
    shapes[8].translate([0.8, -0.5, 0]);
    shapes[8].scale([0.2,0.2,0.2]);

    
    window.addEventListener("keydown", (event) => {

        switch(event.key){
            case 'w':
                shaderPrograms.gouraudDiffuse.enable();
                console.log("switching to Gouraud/diffuse");
                break;
            case 'e':
                console.log("switching to Gouraud/specular");
                shaderPrograms.gouraudSpecular.enable();
                break;
            case 'r':
                console.log("switching to Phong/diffuse");
                shaderPrograms.phongDiffuse.enable();
                break;
            case 't':
                console.log("switching to Phong/specular");
                shaderPrograms.phongSpecular.enable();
                break;
        }
    })

    window.addEventListener("keydown", (event) => {
        let axis = [0,0,0];
        switch (event.key) {
            case 'i':
                axis = [-1, 0, 0];
                break;
            case 'k':
                axis = [1, 0, 0];
                break;
            case 'o':
                axis = [0, -1, 0];
                break;
            case 'u':
                axis = [0, 1, 0];
                break;
            case 'l':
                axis = [0, 0, -1];
                break;
            case 'j':
                axis = [0, 0, 1];
                break;
        }
        if(currentChoice === 0){
            shapes.forEach(shape => {
                shape.rotate(0.1, axis, true);
            })
        }
        else{
            shapes[currentChoice-1].rotate(0.1, axis);
        }
    }
    )

    window.addEventListener("keydown", (event) =>{
        axis = [1,1,1];
        switch(event.key){
            case 'a':
                axis = [0.9, 1, 1];
                break;
            case 'A':
                axis = [1.1 ,1, 1];
                break;
            case 'b':
                axis = [1, 0.9, 1];
                break;
            case 'B':
                axis = [1, 1.1, 1];
                break;
            case 'c':
                axis = [1, 1, 0.9];
                break;
            case 'C':
                axis = [1, 1, 1.1];
                break;
        }
        if(currentChoice===0){
            shapes.forEach(shape=>{
                shape.scale(axis, true);
            })
        }
        else{
            shapes[currentChoice-1].scale(axis);
        }
    })

    window.addEventListener("keydown", (event) => {
        switch (event.key) {
            case '0':
                currentChoice = 0;
                break;
            case '1':
                currentChoice = 1;
                break;
            case '2':
                currentChoice = 2;
                break;
            case '3':
                currentChoice = 3;
                break;
            case '4':
                currentChoice = 4;
                break;
            case '5':
                currentChoice = 5;
                break;
            case '6':
                currentChoice = 6;
                break;
            case '7':
                currentChoice = 7;
                break;
            case '8':
                currentChoice = 8;
                break;
            case '9':
                currentChoice = 9;
                break;
        }
    }
    )

    const moveSpeed = 0.01;
    window.addEventListener("keydown", (event) => {
        let xPos = 0;
        let yPos = 0;
        let zPos = 0;
        switch (event.key) {
            case 'ArrowUp':
                yPos -= moveSpeed;
                break;
            case 'ArrowDown':
                yPos += moveSpeed;
                break;
            case 'ArrowLeft':
                xPos += moveSpeed;
                break;
            case 'ArrowRight':
                xPos -= moveSpeed;
                break;
            case ' ':
                toggleCamMovement();
                break;
            case '.':
                zPos -= moveSpeed;
                break;
            case ',':
                zPos+=moveSpeed;
                break;
        }
        if(cameraMovementEnabled){
            moveCamera(xPos, yPos, 0);
        }
        else{
            if(currentChoice > 0){
                shapes[currentChoice-1].translate([-xPos, -yPos, zPos]);
            }
            else{
                shapes.forEach(shape => {
                    shape.translate([-xPos, -yPos, zPos], true);
                })
            }
        }
    }
    )

    let isDragging = false;
    let offsetX, offsetY;

    window.addEventListener('mousedown', (event) => {
        isDragging = true;

        offsetX = event.clientX - canvas.getBoundingClientRect().left;
        offsetY = event.clientY - canvas.getBoundingClientRect().top;
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    window.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const xPos = (event.clientX - offsetX) / 10000;
            const yPos = (event.clientY - offsetY) / 10000;

            moveCamera(xPos, yPos, 0);
        }
    });

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

    const lightPosition = vec4.fromValues(0, 0, 3, 1);
    vec4.transformMat4(lightPosition, lightPosition, matrices.viewMatrix);
    gl.uniform4fv(currentShaderProgram.uniforms.lightPosition, lightPosition);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    shapes.forEach(shape => {
        if (isChosen(shapes.indexOf(shape))) {
            shape.drawLCS();
        }
        // scale rotation amount by time difference
        //shape.rotate(1 * delta, [0, 1, 1]);
        shape.draw();
    });
    if(currentChoice === 0){
        wcs.draw();
    }
    requestAnimationFrame(render)
}

function moveCamera(x, y, z) {
    mat4.translate(matrices.viewMatrix, matrices.viewMatrix, [x, y, z]);
}

function isChosen(index) {
    return index + 1 === currentChoice ? true : false;
}

function toggleCamMovement() {
    cameraMovementEnabled = !cameraMovementEnabled;
}

