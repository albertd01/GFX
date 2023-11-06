const { mat4, mat3 } = glMatrix;
const toRad = glMatrix.glMatrix.toRadian;

const shapes = [];
let gl = null;

let currentChoice = 0;
let cameraMovementEnabled = true;
let wcs = null;

const shaders = {
    noLight: "v-shader-nolight",
    gouraudDiffuse: "v-gouraudDiffuse",
    fragment: "f-shader"
}

let currentShaderProgram = null;

const shaderInfo = {
    attributes: {
        vertexLocation: "vertexPosition",
        colorLocation: "vertexColor",
        normalLocation: "vertexNormal"
    }, uniforms: {
        modelViewMatrix: "modelViewMatrix",
        projectionMatrix: "projectionMatrix",
        viewMatrix: "viewMatrix",
        normalMatrix: "normalMatrix"
    }
}

const shaderPrograms = {
    noLightProgram: null,
    gouraudDiffuse: null,
    gouraudSpecular: null,
    phongDiffuse: null,
    phongSpecular: null
}

const matrices = {
    viewMatrix: mat4.create(),
    projectionMatrix: mat4.create(),
}