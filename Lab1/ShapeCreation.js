function createCube(){
    /* --------- define vertex positions & colors --------- */
    /* -------------- 3 vertices per triangle ------------- */
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

    /* --------- add one color per face, so 6 times for each color --------- */
    colorData.forEach(color => {
        for (let i = 0; i < 6; ++i) {
            colors.push(color);
        }
    });
    return createShape(vertices, colors)
}

function createTriangleBasedPyramid(){

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

    /* --------- add one color per face, so 6 times for each color --------- */
    
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

function createCone(){

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

    /* --------- add one color per face, so 6 times for each color --------- */

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

function createTrianglePrism(){
    

}

function createPentPrism(){

}

function createParallelepiped(){

}

function createRhombus(){

}


function createShape(vertices, colors){
    

    /* --------- create shape object and initialize data --------- */
    const shape = new Shape();
    shape.initData(vertices, colors)
    return shape;
}