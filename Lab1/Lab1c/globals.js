const { mat4, mat3, vec3,vec4 } = glMatrix;
const toRad = glMatrix.glMatrix.toRadian;

const shapes = [];
let gl = null;

let models = {
    sphereModel: null,
    hemisphere: null,
    upper: null,
    ghostHead: null,
    ghostTorso: null,
}

let pacman = null;
let pacmanLower = null;
let pacmanUpper = null;
let game = null;
let arena = null;
let ghosts= [];

let currentChoice = 0;
let cameraMovementEnabled = true;
let wcs = null;
let camera = null;

let lightMovementEnabled = false;
const lightPosition = vec4.fromValues(0,10,0,1);

const shaders = {
    phongVertex: "v-phong",
    phongFragmentSpecular: "f-phong-specular",
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
        normalMatrix: "normalMatrix",
        lightPosition: "lightViewPosition",
    }
}

const shaderPrograms = {
    phongSpecular: null
}

const matrices = {
    viewMatrix: mat4.create(),
    projectionMatrix: mat4.create(),
}

