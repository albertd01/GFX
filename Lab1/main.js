const { mat4 } = glMatrix;
const toRad = glMatrix.glMatrix.toRadian;

const shapes = [];
let gl = null;
let currentChoice = 0;
let cameraMovementEnabled = true;
let wcs = null;

const locations = {
    attributes: {
        vertexLocation: null,
        colorLocation: null
    }, uniforms: {
        modelViewMatrix: null,
        projectionMatrix: null,
    }
}

const viewMatrix = mat4.create();

window.onload = async () => {
    let canvas = document.getElementById("canvas");
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);
    gl.clearColor(0.729, 0.764, 0.674, 1);

    const program = createShaderProgram("v-shader", "f-shader");
    gl.useProgram(program);

    locations.attributes.vertexLocation = gl.getAttribLocation(program, "vertexPosition");
    locations.attributes.colorLocation = gl.getAttribLocation(program, "vertexColor");
    locations.uniforms.modelViewMatrix = gl.getUniformLocation(program, "modelViewMatrix");
    locations.uniforms.projectionMatrix = gl.getUniformLocation(program, "projectionMatrix");

    const projectionMatrix = mat4.create();
    mat4.perspective(projectionMatrix, toRad(45), canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    gl.uniformMatrix4fv(locations.uniforms.projectionMatrix, gl.FALSE, projectionMatrix);

    mat4.lookAt(viewMatrix, [0, 0, 2], [0, 0, 0], [0, 1, 0]);

    wcs = createWCS();
    shapes.push(createCube());
    shapes[0].translate([-1.5, 0.3, 0]);

    shapes.push(createSquareBasedPyramid());
    shapes[1].translate([-1.1, 0.3, 0]);

    shapes.push(createHexPrism());
    shapes[2].translate([-0.6, 0.2, 0]);

    shapes.push(createCube());
    shapes[3].translate([-0.3, 0.3, 0]);

    shapes.push(createSquareBasedPyramid());
    shapes[4].translate([0.1, 0.3, 0]);

    shapes.push(createHexPrism());
    shapes[5].translate([0.4, 0.2, 0.0]);

    shapes.push(createSquareBasedPyramid());
    shapes[6].translate([0.7, 0.3, 0.0]);

    shapes.push(createCube());
    shapes[7].translate([1.1, 0.3, 0.0]);

    shapes.push(createCube());
    shapes[8].translate([1.6, 0.3, 0.0])

    moveCamera(-0.3, -0.5, -0.5);

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

    /* --------- Load some data from external files - only works with an http server --------- */
    //  await loadSomething();

    requestAnimationFrame(render);
}

/* --------- simple example of loading external files --------- */
async function loadSomething() {
    const data = await fetch('helpers.js').then(result => result.text());
    console.log(data);
}

let then = 0;

function render(now) {
    let delta = now - then;
    delta *= 0.001;
    then = now;

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    shapes.forEach(shape => {
        if (isChosen(shapes.indexOf(shape))) {
            shape.drawLCS();
        }
        shape.draw();
    });
    if (currentChoice === 0) {
        wcs.draw();
    }
    updateControlPanel();
    requestAnimationFrame(render)
}

function isChosen(index) {
    return index + 1 === currentChoice ? true : false;
}

function moveCamera(x, y, z) {
    mat4.translate(viewMatrix, viewMatrix, [x, y, z]);
}

function toggleCamMovement() {
    cameraMovementEnabled = !cameraMovementEnabled;
}


function updateControlPanel() {
    document.getElementById("cameraMovement").textContent = cameraMovementEnabled;
    document.getElementById("choice").textContent = currentChoice;
}

