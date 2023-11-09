function createCube() {
    // define vertex positions & colors
    // 3 vertices per triangle
    const vertices = [
        // X, Y, Z, W
        0.2, 0.2, 0.2, 1,
        -0.2, 0.2, 0.2, 1,
        0.2, -0.2, 0.2, 1,

        -0.2, 0.2, 0.2, 1,
        -0.2, -0.2, 0.2, 1,
        0.2, -0.2, 0.2, 1, // front face end

        -0.2, -0.2, -0.2, 1,
        -0.2, -0.2, 0.2, 1,
        -0.2, 0.2, 0.2, 1,

        -0.2, -0.2, -0.2, 1,
        -0.2, 0.2, 0.2, 1,
        -0.2, 0.2, -0.2, 1, // left face end

        0.2, 0.2, -0.2, 1,
        -0.2, -0.2, -0.2, 1,
        -0.2, 0.2, -0.2, 1,

        0.2, 0.2, -0.2, 1,
        0.2, -0.2, -0.2, 1,
        -0.2, -0.2, -0.2, 1, // back face end

        0.2, -0.2, 0.2, 1,
        -0.2, -0.2, -0.2, 1,
        0.2, -0.2, -0.2, 1,

        0.2, -0.2, 0.2, 1,
        -0.2, -0.2, 0.2, 1,
        -0.2, -0.2, -0.2, 1, // bottom face end

        0.2, 0.2, 0.2, 1,
        0.2, -0.2, -0.2, 1,
        0.2, 0.2, -0.2, 1,

        0.2, -0.2, -0.2, 1,
        0.2, 0.2, 0.2, 1,
        0.2, -0.2, 0.2, 1, // right face end

        0.2, 0.2, 0.2, 1,
        0.2, 0.2, -0.2, 1,
        -0.2, 0.2, -0.2, 1,

        0.2, 0.2, 0.2, 1,
        -0.2, 0.2, -0.2, 1,
        -0.2, 0.2, 0.2, 1, // Top face end
    ];

    const colorData = [
        [1.0, 0.4, 1.0, 1.0],    // Front face: black
        [1.0, 0.0, 0.0, 1.0],    // left face: red
        [0.0, 1.0, 0.0, 1.0],    // back face: green
        [0.0, 0.0, 1.0, 1.0],    // Bottom face: blue
        [1.0, 1.0, 0.0, 1.0],    // Right face: yellow
        [1.0, 0.0, 1.0, 1.0],    // top face: purple
    ];

    const colors = [];

    const normalData = [
        [0, 0, 1], // front
        [-1, 0, 0], // left
        [0, 0, -1], // back
        [0, -1, 0], // bottom
        [1, 0, 0], // right
        [0, 1, 0], // top
    ];

    // add one color and normal per vertex
    const normals = [];

    for (let i = 0; i < 6; ++i) {
        for (let j = 0; j < 6; ++j) {
            normals.push(normalData[i]);
            colors.push(colorData[i]);
        }
    }

    // create shape object and initialize data
    const cube = new Shape();
    cube.initData(vertices, colors, normals)

    return cube;
}


function createShapeGivenVerticesAndFaces(faces){
    const currentR = Math.random();
    const currentG = Math.random();
    const currentB = Math.random();

    const colorData = [];
    const positions = [];
    const normalData = [];
    for(let i = 0; i < faces.length; ++i){
        for(let j = 0; j < 3; ++j){
            positions.push(faces[i].vertices[j].x);
            positions.push(faces[i].vertices[j].y);
            positions.push(faces[i].vertices[j].z);
            positions.push(1.0);
            normalData.push(faces[i].normal);
            colorData.push([currentR, currentB, currentG, 1.0]);
        }
    }
    return createShape(positions, colorData, normalData);
}

function createShape(vertices, colors, normals){
    const shape = new Shape();
    shape.initData(vertices, colors, normals)
    return shape;
}

function createCS(vertices, colors){
    const cs = new CoordinateSystem();
    cs.initData(vertices, colors, []);
    return cs;
}

function createWCS(){
    const vertices = [
        -30.0, 0.0, 0.0, 1.0, //x-direction
        30.0, 0.0, 0.0, 1.0,

        0.0, -30.0, 0.0, 1.0, //y-direction
        0.0, 30.0, 0.0, 1.0, 

        0.0, 0.0, -30.0, 1.0, //z-direction
        0.0, 0.0, 30.0, 1.0,  
    ];

    const colorData = [
        [0.0, 0.0, 0.0, 1.0], //black
        [1.0, 0.0, 0.0, 1.0], //red
        [0.0, 0.0, 1.0, 1.0], //blue
    ];

    const colors = [];

    colorData.forEach(color =>{
        for(let i = 0; i<2 ; ++i){
            colors.push(color);
        }
    })
    

    return createCS(vertices, colors);
}
