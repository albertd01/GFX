function createCube(){
    const vertices = [
        // X, Y, Z, W
        0.1, 0.1, 0.1, 1,
        -0.1, 0.1, 0.1, 1,
        0.1, -0.1, 0.1, 1,

        -0.1, 0.1, 0.1, 1,
        -0.1, -0.1, 0.1, 1,
        0.1, -0.1, 0.1, 1, // front face end

        -0.1, -0.1, -0.1, 1,
        -0.1, -0.1, 0.1, 1,
        -0.1, 0.1, 0.1, 1,

        -0.1, -0.1, -0.1, 1,
        -0.1, 0.1, 0.1, 1,
        -0.1, 0.1, -0.1, 1, // left face end

        0.1, 0.1, -0.1, 1,
        -0.1, -0.1, -0.1, 1,
        -0.1, 0.1, -0.1, 1,

        0.1, 0.1, -0.1, 1,
        0.1, -0.1, -0.1, 1,
        -0.1, -0.1, -0.1, 1, // back face end

        0.1, -0.1, 0.1, 1,
        -0.1, -0.1, -0.1, 1,
        0.1, -0.1, -0.1, 1,

        0.1, -0.1, 0.1, 1,
        -0.1, -0.1, 0.1, 1,
        -0.1, -0.1, -0.1, 1, // bottom face end

        0.1, 0.1, 0.1, 1,
        0.1, -0.1, -0.1, 1,
        0.1, 0.1, -0.1, 1,

        0.1, -0.1, -0.1, 1,
        0.1, 0.1, 0.1, 1,
        0.1, -0.1, 0.1, 1, // right face end

        0.1, 0.1, 0.1, 1,
        0.1, 0.1, -0.1, 1,
        -0.1, 0.1, -0.1, 1,

        0.1, 0.1, 0.1, 1,
        -0.1, 0.1, -0.1, 1,
        -0.1, 0.1, 0.1, 1, // Top face end
    ];

    const colorData = [
        [0.0, 0.0, 0.0, 1.0],    // Front face: black
        [1.0, 0.0, 0.0, 1.0],    // left face: red
        [0.0, 1.0, 0.0, 1.0],    // back face: green
        [0.0, 0.0, 1.0, 1.0],    // Bottom face: blue
        [1.0, 1.0, 0.0, 1.0],    // Right face: yellow
        [1.0, 0.0, 1.0, 1.0],    // top face: purple
    ];

    const colors = [];

    colorData.forEach(color => {
        for (let i = 0; i < 6; ++i) {
            colors.push(color);
        }
    });
    return createShape(vertices, colors)
}


function createSquareBasedPyramid(){
    const vertices = [
        // X, Y, Z, W
        //bottom
        -0.1, -0.1, 0.0, 1,
        0.1, -0.1, 0.0, 1,
        -0.1, 0.1, 0.0, 1,

        -0.1, 0.1, 0.0, 1,
        0.1, -0.1, 0.0, 1,
        0.1, 0.1, 0.0, 1,

        //side1
        -0.1, 0.1, 0.0, 1,
        0.1, 0.1, 0.0, 1,
        0.0, 0.0, 0.1, 1,

        //side2
        0.1, 0.1, 0.0, 1,
        0.1, -0.1, 0.0, 1,
        0.0, 0.0, 0.1, 1,

        //side3
        -0.1, -0.1, 0.0, 1,
        -0.1, 0.1, 0.0, 1,
        0.0, 0.0, 0.1, 1,

        //side4
        -0.1, -0.1, 0.0, 1,
        0.1, -0.1, 0.0, 1,
        0.0, 0.0, 0.1, 1,

    ];

    const colorData = [
        [0.0, 0.0, 0.0, 1.0],    // Front face: black
        [1.0, 0.0, 0.0, 1.0],    // left face: red
        [0.0, 1.0, 0.0, 1.0],    // back face: green
        [0.0, 0.0, 1.0, 1.0],    // Bottom face: blue
        [1.0, 1.0, 0.0, 1.0],    // Right face: yellow
        [1.0, 0.0, 1.0, 1.0],    // top face: purple
    ];
    
    const colors = [];
    
    for(let i = 0; i<6; ++i){
        colors.push(colorData[0]);
    }

    for(let j=0; j<4; ++j){
        for(let i = 0; i<3; ++i){
            colors.push(colorData[j+1]);
        }
    }
    return createShape(vertices, colors);
}

function createWCS(){
    const vertices = [
        -20.0, 0.0, 0.0, 1.0, //x-direction
        20.0, 0.0, 0.0, 1.0,

        0.0, -20.0, 0.0, 1.0, //y-direction
        0.0, 20.0, 0.0, 1.0, 

        0.0, 0.0, -20.0, 1.0, //z-direction
        0.0, 0.0, 20.0, 1.0,  
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

function createHexPrism(){
    const vertices = [
        //bottom face
        0.0, 0.0, 0.0, 1.0, //A bot
        0.05, 0.05, 0.0, 1.0, //B bot
        0.0, 0.1, 0.0, 1.0, //C bot

        0.0, 0.0, 0.0, 1.0, //A bot
        0.0, 0.1, 0.0, 1.0, // C bot
        -0.05, 0.1, 0.0, 1.0, //D bot

        0.0, 0.0, 0.0, 1.0, //A bot
        -0.05, 0.1, 0.0, 1.0, //D bot
        -0.1, 0.05, 0.0, 1.0,  //E bot

        0.0, 0.0, 0.0, 1.0, //A bot
        -0.1, 0.05, 0.0, 1.0, //E bot
        -0.05, 0.0, 0.0, 1.0, //F bot

        //top face
        0.0, 0.0, 0.3, 1.0, //A top
        0.05, 0.05, 0.3, 1.0,//B top
        0.0, 0.1, 0.3, 1.0, //C top

        0.0, 0.0, 0.3, 1.0, //A top
        0.0, 0.1, 0.3, 1.0, //C top
        -0.05, 0.1, 0.3, 1.0, //D top

        0.0, 0.0, 0.3, 1.0, //A top
        -0.05, 0.1, 0.3, 1.0, //D top
        -0.1, 0.05, 0.3, 1.0, //E top

        0.0, 0.0, 0.3, 1.0, //A top
        -0.1, 0.05, 0.3, 1.0, //E top
        -0.05, 0.0, 0.3, 1.0, //F top  

        //side 1
        0.0, 0.0, 0.0, 1.0, //A bot
        0.0, 0.0, 0.3, 1.0, //A top
        0.05, 0.05, 0.0, 1.0, //B bot

        0.0, 0.0, 0.3, 1.0, //A top
        0.05, 0.05, 0.0, 1.0, //B bot
        0.05, 0.05, 0.3, 1.0,//B top

        //side 2
        0.05, 0.05, 0.0, 1.0, //B bot
        0.05, 0.05, 0.3, 1.0,//B top
        0.0, 0.1, 0.3, 1.0, //C top

        0.05, 0.05, 0.0, 1.0, //B bot
        0.0, 0.1, 0.0, 1.0, //C bot
        0.0, 0.1, 0.3, 1.0, //C top

        //side 3
        0.0, 0.1, 0.0, 1.0, //C bot
        0.0, 0.1, 0.3, 1.0, //C top
        -0.05, 0.1, 0.0, 1.0, //D bot

        0.0, 0.1, 0.3, 1.0, //C top
        -0.05, 0.1, 0.0, 1.0, //D bot
        -0.05, 0.1, 0.3, 1.0, //D top

        //side 4
        -0.05, 0.1, 0.0, 1.0, //D bot
        -0.05, 0.1, 0.3, 1.0, //D top
        -0.1, 0.05, 0.0, 1.0, //E bot

        -0.05, 0.1, 0.3, 1.0, //D top
        -0.1, 0.05, 0.0, 1.0, //E bot
        -0.1, 0.05, 0.3, 1.0, //E top

        //side 5
        -0.1, 0.05, 0.0, 1.0, //E bot
        -0.1, 0.05, 0.3, 1.0, //E top
        -0.05, 0.0, 0.0, 1.0, //F bot

        -0.1, 0.05, 0.3, 1.0, //E top
        -0.05, 0.0, 0.0, 1.0, //F bot
        -0.05, 0.0, 0.3, 1.0, //F top  

        //side 6
        -0.05, 0.0, 0.0, 1.0, //F bot
        -0.05, 0.0, 0.3, 1.0, //F top 
        0.0, 0.0, 0.0, 1.0, //A bot

        -0.05, 0.0, 0.3, 1.0, //F top 
        0.0, 0.0, 0.0, 1.0, //A bot
        0.0, 0.0, 0.3, 1.0, //A top
    ]

    const colorData = [
        [0.0, 0.0, 0.0, 1.0],    // Front face: black
        [1.0, 0.0, 0.0, 1.0],    // left face: red
        [0.0, 1.0, 0.0, 1.0],    // back face: green
        [0.0, 0.0, 1.0, 1.0],    // Bottom face: blue
        [1.0, 1.0, 0.0, 1.0],    // Right face: yellow
        [1.0, 0.0, 1.0, 1.0],    // top face: purple
        [0.8, 0.2, 0.1, 1.0],
    ];
    const colors = [];

    for(let j=0; j<2; ++j) {
        for (let i = 0; i < 12; ++i) {
            colors.push(colorData[0]);
        }
    };

    for(let j=0; j<6; ++j){
        for(let i = 0; i<6; ++i){
            colors.push(colorData[j+1]);
        }
    }
    
    return createShape(vertices, colors);
    
}

function createShapeGivenVerticesAndFaces(vertices, faces){
    let colors = [];
    let positions = [];
    //console.log(vertices[0].x, faces[0].indices.length);
    
    faces.forEach(face => {
        const currentR = Math.random();
        const currentG = Math.random();
        const currentB = Math.random();
        face.indices.forEach(index =>{
            positions.push(vertices[index].x);
            positions.push(vertices[index].y);
            positions.push(vertices[index].z);
            positions.push(1.0);
            colors.push([currentR, currentG, currentB, 1.0]);
        })
    })
    
    return createShape(positions, colors);
}

function createShape(vertices, colors){
    const shape = new Shape();
    shape.initData(vertices, colors)
    return shape;
}

function createCS(vertices, colors){
    const cs = new CoordinateSystem();
    cs.initData(vertices, colors);
    return cs;
}

